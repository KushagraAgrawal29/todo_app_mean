import { Component ,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import * as UserActions from '../user/user.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todo$: Observable<Todo[]> = new Observable();

  constructor(
    private todoService: TodoService,
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) { }
  logout(){
    console.log("Hello here at logout")
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/login']);

  }

  createTodo(){
    this.router.navigate(['/create-todo']);
  }
 
  ngOnInit() : void{
    this.todo$ = this.todoService.getTodos();
    this.todo$.subscribe(todos => console.log(todos));
  }
  editTodo(todoId:number){
    this.router.navigate(['/edit-todo', todoId]);
  }
  deleteTodo(todoId: number) {
    this.http.delete(`http://localhost:3000/todos/${todoId}`)
      .subscribe(
        () => {
          console.log('Todo deleted successfully');
          alert('Todo deleted successfully');
          this.router.navigate(['/todos']);
          window.location.reload();
        },
        (error) => {
          window.location.reload();
          console.error('Error deleting todo', error);
        }
      );
  }

}
