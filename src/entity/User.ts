import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Order } from "./Order";
import bcryptjs from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({nullable: true})
  address!: string;

  @Column({ nullable: true })
  cellphone!: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];

  static encryptPassword(password: string, salt: string) {
    return bcryptjs.hashSync(password, salt);
  }

  static comparePassword(password: string, salt: string) {
    return bcryptjs.compareSync(password, salt);
  }
}
