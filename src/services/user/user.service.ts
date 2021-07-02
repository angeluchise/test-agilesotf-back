import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../models/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(user: User, id: number) {
    user.id = (user.id ? user.id : id);
    let userFound = await this.userRepository.findOne(user.id);
    userFound = {...user} as User;
    return await this.userRepository.save(userFound);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
  async findRelationsByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async delete(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async register(user: User): Promise<any> {
    user = new User(user);
    return await this.userRepository.save(user);
}

}
