// products.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Delete,
  Put, // Importa Put
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { CreateProductDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async addProduct(@Body() productData: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.addProduct(productData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('user/:userId')
  async getProductsByUserId(
    @Param('userId') userId: number,
  ): Promise<Product[]> {
    return this.productService.getProductsByUserId(userId);
  }

  @Delete()
  async deleteProducts(
    @Body('ids') ids: number[],
  ): Promise<{ message: string }> {
    try {
      await this.productService.deleteProductsByIds(ids);
      return { message: 'Products deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id') // Define la ruta para actualizar un producto
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: CreateProductDto,
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(id, productData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
