import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity('user')
export default class User {
  constructor(data?: Partial<any>) {
    if (data) {
      data.password = this.hashPassword(data.password)
      this.load(data);
    }
  }

  public load(data: Partial<any>) {
    Object.assign(this, data);
  }
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false})
  password: string;

  @Column()
  name: string;
  
  @BeforeInsert()

  public getPlain() {
    return classToPlain(this);
  }
  private hashPassword(password) {
    return password = crypto.createHmac('sha256', password).digest('hex');
  }
  private decodePassword(password) {
    return password = crypto.createHmac('sha256', password).digest('hex');
  }
  public changePassword(newPassword: string) {
    this.password = this.hashPassword(newPassword);
    this.hashPassword(this.password);
  }
}


