import { Body, Controller, Get, Param, UseGuards, Request, Post, Delete } from '@nestjs/common';
import { TaskService } from '../services/task/task.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  add(@Body() task: any, @Request() req): any {
    return this.taskService.add(task, req.user);
  }
  @Post('/resolve/:id')
  resolve(@Param('id') id: string): Promise<any> {
    return this.taskService.resolve(id);
  }
  @Get('')
  findAllByUser(@Request() req): Promise<any> {
    return this.taskService.findAllByUser(req.user.id);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.taskService.delete(Number(id));
  }
}
