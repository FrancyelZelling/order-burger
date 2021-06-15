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

  @Column({ nullable: true, type: "datetime" })
  created_at!: string;

  @Column({ nullable: true, type: "datetime"})
  updated_at!: string;

  @Column({ nullable: true, default: "completed" })
  orderStatus!: string;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  customer!: User;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products!: Product[];
}
