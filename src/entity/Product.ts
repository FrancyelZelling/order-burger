import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Photos } from "./Photos"

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("double")
  price!: number;

  @OneToMany(() => Photos, photos => photos.product)
  photos!: Photos[]
}
