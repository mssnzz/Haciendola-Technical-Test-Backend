import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Replace 'yourSecretKey' with your actual secret key
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
