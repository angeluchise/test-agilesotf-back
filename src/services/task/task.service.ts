import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Task from '../../models/task/task.entity';
import User from 'src/models/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
) {}

  async findAllByUser(id): Promise<Task[]> {
    let user = await this.userService.findOne(id);
    if (!user) {
      throw 'User no found';
    };
    return this.taskRepository.find({
      relations: [
        'user',
      ],
      where: {
        user: user,
      },
    });
  }

  async add(task, user): Promise<Task> {
    user = await this.userService.findOne(user.id);
    if (!user) {
      throw 'user no found'
    }
    task.user = user;
    task = new Task(task);
    return this.taskRepository.save(task);
  }

  async resolve(id): Promise<Task> {
    let taskFound: Task = await this.taskRepository.findOne(id);
    taskFound.status = 'resolved';
    return await this.taskRepository.save(taskFound);
  }

  async delete(id: number): Promise<any> {
    return await this.taskRepository.delete(id).then((data)=>  {
      return 'Task was deleted';
    });
  }
}
