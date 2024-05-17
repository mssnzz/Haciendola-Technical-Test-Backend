import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ResetPasswordDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getProfile(@Request() req) {
    console.log('Request User:', req.user);
    return this.usersService.findOne(req.user.id);
  }

  @Post('/create')
  async createUser(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.usersService.resetPassword(resetPasswordDto);
      return { message: 'Password has been reset successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
