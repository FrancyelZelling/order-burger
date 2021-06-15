import {Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from "typeorm";
import { Product } from "./Product"

@Entity()
export class Photos extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, product => product.photos)
  product!: Product;
}
