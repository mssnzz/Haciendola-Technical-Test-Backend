import { Product } from 'src/products/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // En un caso real, las contraseñas deben ser hasheadas antes de ser almacenadas

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
