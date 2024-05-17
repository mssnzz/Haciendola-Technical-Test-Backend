import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  handle: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  sku: string;

  @IsNumber()
  grams: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  comparePrice?: number;

  @IsString()
  barcode: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number; // Explicit field for user ID
}
