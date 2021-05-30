import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  customer!: User;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products!: Product[];
}
