import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async getTasks() {
    return await this.taskRepository.find();
  }

  async getTask(id: number) {
    return await this.taskRepository.findOne(id);
  }
}
