import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { username, newPassword } = resetPasswordDto;
    const user = await this.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.save(user);
  }
}
