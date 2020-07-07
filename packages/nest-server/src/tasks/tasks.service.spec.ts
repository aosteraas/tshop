import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

const mockTaskRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TasksService', () => {
  let service: TasksService;
  let repository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createTask returns a new task', async () => {
    const createTaskDto = {
      title: 'some title',
      description: 'some description',
    };
    const taskEntity = {
      id: 1,
      created: new Date('2020-06-24T09:42:28.004Z'),
      ...createTaskDto,
    };
    repository.createTask.mockResolvedValue(taskEntity);
    const task = await service.createTask(createTaskDto);

    expect(task).toMatchSnapshot(taskEntity);
    expect(task).toEqual(taskEntity);
  });
});
