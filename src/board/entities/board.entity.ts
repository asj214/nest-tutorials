import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column()
  title: string;

  @Column("text")
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
