import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/taskService/tasks.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthGuard } from 'src/app/SaveGuard/auth.guard';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  userId: string;
  criteria: string;
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  newTask = {
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
    dueDate: '',
    userId: '',
    criteria: 'job'
  };
  taskEdit = {
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
    dueDate: '',
    userId: '',
    criteria: ''

  };
  tasks: Task[] = [];
  backupTask: any = this.tasks;
  backupTask2: any = this.tasks;

  createtask: boolean = false;
  editTasks: boolean = false;
  taskId: any = ''
  searchTerm: string = ''
  constructor(private taskService: TaskService, private AuthGuard: AuthGuard, private Router: Router, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.loadTasks();
  }
  loadTasks() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (userId) { // Perform null check
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.taskService.getAllTasks(headers, userId).subscribe(
        response => {
          this.tasks = response;
          this.backupTask = response;
          this.backupTask2 = response;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('User ID not found in localStorage');
    }
  }

  createTaskpopUp() {
    this.createtask = true;

  }
  editTask(task: any) {
    this.editTasks = true;
    this.taskId = task._id
    this.taskEdit = task;
  }
  editExectingTask() {
    this.editTasks = true;
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage. Authorization denied.');
      return;
    }
    const userId = localStorage.getItem('userId');
    if (userId)
      this.newTask.userId = userId;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.taskService.updateTask(this.taskId, this.taskEdit, headers).subscribe(
      response => {
        this.snackBar.open('Task updated', 'Dismiss', {
          duration: 3000,
        });
        this.editTasks = false;
      },
      error => {
        this.snackBar.open('Error updating task', 'Dismiss', {
          duration: 3000,
        });
        this.editTasks = false;

      }
    );

  }

  deleteTask(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = localStorage.getItem('userId');
    if (userId)
      this.newTask.userId = userId;
    this.taskService.deleteTask(id, headers).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t._id !== id);
        this.snackBar.open("Task Deleted", 'Dismiss', {
          duration: 3000,
        });
      },
      (error) => {
        console.error(':', error);
        this.snackBar.open("Failed to delete task", 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }
  CreateTask() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (userId)
      this.newTask.userId = userId;
    this.taskService.createTask(this.newTask, headers).subscribe(
      response => {
        this.snackBar.open("Task Added successfully", 'Dismiss', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.createtask = false;
        this.loadTasks();
        this.newTask = {
          title: '',
          description: '',
          priority: 'low',
          status: 'pending',
          dueDate: '',
          userId: '',
          criteria: ''

        }
      },
      error => {
        this.snackBar.open("Error creating task", 'Dismiss', {
          duration: 3000,
        });
        this.createtask = false;

      }
    );

  }
  receiveValueFromChild(event: any) {
    this.tasks = event;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.Router.navigate(['/login']);

  }
  isFormSubmitted: boolean = false;

  submitForm() {
    this.isFormSubmitted = true;
  }
  searchTasks() {
    this.tasks = this.backupTask2;
    if (!this.searchTerm.length) {
      this.tasks = this.backupTask2;
    }
    else {
      this.tasks = this.tasks.filter((eletemt: any) => {
        if (eletemt.criteria == this.searchTerm) {
          return eletemt;

        }
      });
    }

  }
}
