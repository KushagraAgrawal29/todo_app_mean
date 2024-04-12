import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  constructor(private http: HttpClient, private router: Router) { }
  title: string = '';
  description: string = '';
  priority: string = '';
  status: string = '';
  createTodo() {
    const newTodo = { title: this.title, description: this.description,priority: this.priority, status:this.status };
    this.http.post('http://localhost:3000/todos/create', newTodo)
      .subscribe(
        (response) => {
          console.log('New Todos created successfully', response);
          alert('New Todos created successfully');
          this.router.navigate(['/todos']);
        },
        (error) => {
          console.error('Error creating todo', error);
        }
      );
  }
    
  }


