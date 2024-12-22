import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [JwtModule.register({}), UserModule, SmsModule],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
