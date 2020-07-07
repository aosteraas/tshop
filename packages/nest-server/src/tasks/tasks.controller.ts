import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.createTask(createTaskDto);
    return task;
  }
}
