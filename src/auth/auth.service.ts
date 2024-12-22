import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { IPayload } from './model';
import { customAlphabet } from 'nanoid';
import { FindOptionsWhere } from 'typeorm';
import { ForgotPasswordDto, LoginDto, RegisterDto, VerifyUserDto } from './dto';
import { SmsService } from 'src/sms';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
  ) {}

  async generateAccessToken(user: User) {
    const payload: IPayload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      isConfirmed: user.isConfirmed,
    };

    return this.jwtService.sign(payload, {
      secret: process.env['ACCESS_TOKEN_SECRET'],
    });
  }

  async generateRefreshToken(user: User) {
    const payload: IPayload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      isConfirmed: user.isConfirmed,
    };

    return this.jwtService.sign(payload, {
      secret: process.env['REFRESH_TOKEN_SECRET'],
    });
  }

  async register(params: RegisterDto) {
    const { phone, password } = params;

    // Duplicate user
    const duplicateUser = await this.userService.getOne({ phone });
    if (duplicateUser) throw new BadRequestException('User already exists.');

    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        phone: phone,
        password: hashedPassword,
      });

      // Send OTP
      await this.sendVerificationCode(user);

      const accessToken = await this.generateAccessToken(user);
      return {
        token: {
          type: 'Bearer',
          accessToken: accessToken,
        },
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
      };
    } catch (error) {
      throw new BadRequestException('User was not registered.');
    }
  }

  public async hashPassword(password: string): Promise<string> {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  private async matchPassword(password: string, hashPassword: string) {
    const matched = bcrypt.compareSync(password, hashPassword);
    return matched;
  }

  private async generateVerificationCode() {
    // generate token
    const nanoid = customAlphabet('1234567890');
    const verificationCode = nanoid(6);
    return verificationCode;
  }

  async sendVerificationCode(user: Partial<User>, type?: string) {
    // generate token
    const verificationCode = await this.generateVerificationCode();
    if (type === 'forgot_password') {
      await this.userService.update(user.id, {
        forgotPasswordOtp: verificationCode,
        forgotPasswordOtpExpiresAt: new Date(new Date().getTime() + 25 * 60000),
      });
    } else {
      await this.userService.update(user.id, {
        verificationOtp: verificationCode,
        verificationOtpExpiresAt: new Date(new Date().getTime() + 25 * 60000),
      });
    }
    try {
      // Send OTP from here
      this.smsService
        .sendSMS(user.phone, `The OTP code is ${verificationCode}`)
        .then((res) => this.logger.debug(res))
        .catch((err) => this.logger.error(err));
      return 'OTP has been sent.';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verify(params: VerifyUserDto) {
    const { phone, code } = params;

    const user = await this.getUser({ phone });

    if (user?.verificationOtp !== code)
      throw new BadRequestException('OTP does not match.');

    // Expiry Validation
    // if (user?.verificationOtpExpiresAt <= new Date(Date.now()))
    //   throw new BadRequestException('OTP has expired.');

    try {
      await this.userService.update(user.id, {
        isConfirmed: true,
        verificationOtp: null,
        verificationOtpExpiresAt: null,
      });

      return 'User has been verified.';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(params: LoginDto) {
    try {
      const { phone, password } = params;

      const user = await this.getUser({ phone });

      // You can perform user email or phone verification here

      const validPassword = await this.matchPassword(password, user.password);
      if (!validPassword)
        throw new BadRequestException(`Password does not match!`);
      const loginResponse = {
        token: {
          type: 'Bearer',
          accessToken: await this.generateAccessToken(user),
        },
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
      };

      return loginResponse;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async forgotPassword(phone: string) {
    try {
      const user = await this.getUser({ phone });
      return await this.sendVerificationCode(user, 'forgot_password');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verifyForgotPassword(params: ForgotPasswordDto) {
    const { phone, code } = params;

    const user = await this.getUser({ phone });

    if (user?.forgotPasswordOtp !== code)
      throw new BadRequestException('OTP does not match.');

    // Expiry Validation
    // if (user?.forgotPasswordOtpExpiresAt <= new Date(Date.now()))
    //   throw new BadRequestException('OTP has expired.');

    try {
      await this.userService.update(user.id, {
        forgotPasswordOtp: null,
        forgotPasswordOtpExpiresAt: null,
      });

      return 'OTP has been verified.';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async resetPassword(params: ForgotPasswordDto) {
    const { phone, password } = params;
    const user = await this.getUser({ phone });
    try {
      const hashedPassword = await this.hashPassword(password);
      await this.userService.update(user.id, { password: hashedPassword });
      return `Password has been reset.`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePassword(user: IPayload, updatePasswordInput: any) {
    const { oldPassword, newPassword, confirmNewPassword } =
      updatePasswordInput;
    const validUser = await this.getUser({ id: user.id });
    if (!validUser) throw new NotFoundException(`User does not exist.`);
    const validOldPassword = bcrypt.compareSync(
      oldPassword,
      validUser.password,
    );
    if (!validOldPassword)
      throw new BadRequestException(`Old password does not match!`);

    if (newPassword != confirmNewPassword)
      throw new BadRequestException(
        `New password and confirmed new password does not match!`,
      );

    const hashedPassword = await this.hashPassword(newPassword);
    try {
      await this.userService.update(validUser.id, {
        password: hashedPassword,
      });
      return `Password has been updated.`;
    } catch (error) {
      this.logger.error(`Error while updating password => %s`, error);
      throw new BadRequestException(`Oops! Something went wrong.`);
    }
  }

  async getUser(whereParams?: FindOptionsWhere<User>) {
    const user = await this.userService.getOne(whereParams);
    if (!user) throw new NotFoundException('User does not exist.');
    return user;
  }
}
