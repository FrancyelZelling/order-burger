import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Photos } from "./Photos"
import { Category } from "./Category"

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

  @ManyToOne(() => Category, category => category.name, {nullable: true, eager: true})
  category!: number | null;
}
