import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  handle: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 100 })
  sku: string;

  @Column({ type: 'int' })
  grams: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  comparePrice: number;

  @Column({ length: 100, nullable: true })
  barcode: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;
}
