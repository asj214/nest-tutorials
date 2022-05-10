import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
