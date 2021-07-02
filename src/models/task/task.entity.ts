import { Exclude, Type } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from '../user/user.entity';

export enum Status {
  resolved = 'resolved',
  unsolved = 'unsolved',
}

@Entity('task')
export default class Task {
  constructor(data?: Partial<any>) {
    if (data) {
      this.load(data);
    }
  }

  public load(data: Partial<any>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.unsolved })
  status: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @Type(() => User)
  @ManyToOne(() => User)
  public user: User;
}
