import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  UpdatePasswordDto,
  VerifyUserDto,
} from './dto';
import { AtGuard, CurrentUser } from './decorator';
import { IPayload } from './model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('register-verify')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return await this.authService.verify(verifyUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { phone } = forgotPasswordDto;
    return await this.authService.forgotPassword(phone);
  }

  @Post('forgot-password-verify')
  async verifyForgotPassword(
    @Body() verifyForgotPasswordDto: ForgotPasswordDto,
  ) {
    return await this.authService.verifyForgotPassword(verifyForgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ForgotPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @AtGuard()
  @Post('update-password')
  async updatePassword(
    @CurrentUser() user: IPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.authService.updatePassword(user, updatePasswordDto);
  }

  @AtGuard()
  @Post('resend-verify-otp')
  async resendVerifyOtp(@CurrentUser() user: IPayload) {
    return await this.authService.sendVerificationCode(user);
  }
}
