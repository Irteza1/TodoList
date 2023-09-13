import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(headers: HttpHeaders, userId: string): Observable<any> {
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}?userId=${userId}`, options);
  }

  getTaskById(taskId: string): Observable<any> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.get(url);
  }

  createTask(task: any, headers: HttpHeaders): Observable<any> {
    return this.http.post(this.baseUrl, task, { headers: headers });
  }
  updateTask(taskId: string, task: any,headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.put(url, task,{ headers: headers });
  }

  deleteTask(taskId: string,headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.delete(url,{ headers: headers });
  }
}
