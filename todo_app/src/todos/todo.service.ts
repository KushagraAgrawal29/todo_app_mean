import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ){}

  async createTodo(todoData: Partial<Todo>): Promise<Todo> {
    // Here you can hash the password or perform any other necessary operations

    // Create a new todo object
    const newTodo = this.todoRepository.create(todoData);

    // Save the new todo to the database
    return this.todoRepository.save(newTodo);
  }

  async getTodoById(id: number): Promise<Todo | undefined> {
    return this.todoRepository.findOne({where: {id}});
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | undefined> {
    const { title, description, status, priority } = updateTodoDto;
    const todo = await this.todoRepository.findOne({where:{id}});
    if (!todo) {
      return undefined;
    }
    if (title !== undefined) {
      todo.title = title;
    }
    if (description !== undefined) {
      todo.description = description;
    }
    if (status !== undefined) {
      todo.status = status;
    }
    if (priority !== undefined) {
      todo.priority = priority;
    }
    await this.todoRepository.save(todo);
    return todo;
  }

  async deleteTodo(id: number): Promise<Todo | undefined> {
    const todo = await this.todoRepository.findOne({where:{id}});
    if (!todo) {
      return undefined;
    }
    await this.todoRepository.delete(id);
    return todo;
  }
}
