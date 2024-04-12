import { Controller, Get, Param, Post, Body, BadRequestException, NotFoundException,Put,Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.getTodoById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Post('create')
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      const newTodo = await this.todoService.createTodo(createTodoDto); // Call the TodoService to create a new todo
      return { message: 'Todo created successfully', todo: newTodo };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<{ message: string, todo: Todo }> {
    const updatedTodo = await this.todoService.updateTodo(id, updateTodoDto);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return { message: "Todo updated successfully", todo: updatedTodo }; 
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id') id: number,
  ): Promise<{message: string}> {
    const deletedTodo = await this.todoService.deleteTodo(id);
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return  { message: `Deleted Todo with ID "${id}"`};
  }
}
