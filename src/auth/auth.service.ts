// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { username: user.username, sub: user.id };
    const expiresIn = 3600; // Set expiration to 60 seconds
    const accessToken = this.jwtService.sign(payload, { expiresIn: expiresIn });

    return {
      access_token: accessToken,
      expires_in: expiresIn,
    };
  }
}
