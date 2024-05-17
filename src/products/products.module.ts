import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
