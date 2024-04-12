// src/todos/todo.module.ts
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController], // Register the TodoController
  providers: [TodoService],       // Register the TodoService
})
export class TodoModule {}
