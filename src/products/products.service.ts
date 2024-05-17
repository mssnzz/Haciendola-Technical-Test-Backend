// products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './products.entity';
import { User } from 'src/users/users.entity';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addProduct(productData: CreateProductDto): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: productData.userId },
    });
    if (!user) throw new Error('User not found');

    const product = this.productRepository.create(productData);
    product.user = user;
    return this.productRepository.save(product);
  }

  async updateProduct(
    id: number,
    productData: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');

    Object.assign(product, productData);
    return this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getProductsByUserId(userId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { user: { id: userId } },
      order: {
        id: 'ASC',
      },
    });
  }

  async deleteProductsByIds(ids: number[]): Promise<void> {
    await this.productRepository.delete({ id: In(ids) });
  }
}
