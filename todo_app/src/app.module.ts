import { MiddlewareConsumer, Module, Post, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { SignupController } from './auth/signup.controller';
import { UserService } from './auth/user.service';
import { LoginController } from './login/login.controller'; // Import the LoginController
import { LoginService } from './login/login.service';
import { JwtService } from '@nestjs/jwt';
import { Todo } from './todos/todo.entity';
import { TodoController } from './todos/todo.controller';
import { TodoService } from './todos/todo.service';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // SQLite database file name
      entities: [User,Todo],
      synchronize: true, // Automatically create database schema based on entities
    }),
    TypeOrmModule.forFeature([User,Todo]),
  ],
  controllers: [SignupController, LoginController,TodoController],
  // controllers:[AppController],
  // providers:[AppService]
  providers: [UserService, LoginService, JwtService,TodoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
