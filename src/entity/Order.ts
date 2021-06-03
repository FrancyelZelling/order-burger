import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
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

  @Column({ nullable: true })
  total!: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  customer!: User;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products!: Product[];
}
