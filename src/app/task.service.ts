import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5220/Task';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/get_tasks`);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_task`, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_task/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_task/${taskId}`);
  }
}