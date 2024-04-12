import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})

export class EditTodoComponent {
  todoId: number = 0;
  title: string ='';
  description: string = '';
  status: string = '';
  priority: string = '';

  constructor(private http: HttpClient, 
              private router: Router,
              private route: ActivatedRoute
            ) { }
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('todoId')){
      this.todoId = parseInt(this.route.snapshot.paramMap.get('todoId') || '0');
    }
    console.log(typeof(this.todoId))
    this.http.get(`http://localhost:3000/todos/${this.todoId}`)
      .subscribe((response: any) => {
        this.title = response.title;
        this.description = response.description;
      });
  }
  
  editTodo(){
    this.http.put(`http://localhost:3000/todos/${this.todoId}`, { title: this.title, description: this.description, priority: this.priority, status: this.status })
      .subscribe(
        () => {
          console.log('todo updated successfully');
          alert('todo updated successfully');
          this.router.navigate(['/todos']);
        },
        (error) => {
          console.error('Error updating todo', error);
        }
      );
  }
}
