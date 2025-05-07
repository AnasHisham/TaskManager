import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  APIURL: string;

  constructor(private http: HttpClient) {
    this.APIURL = environment.APIURL;
  }

  GetTasks(user: number, status: string): Observable<any> {
    let url = this.APIURL + 'tasks?userId=' + user;
    if (status != null && status != undefined) {
      url = url + '&status=' + status;
    }
    return this.http
      .get<any[]>(url, { responseType: 'json' })
      .pipe(map((data) => data));
  }

  GetMyTasks(): Observable<any> {
    let url = this.APIURL + 'tasks/user';

    return this.http
      .get<any[]>(url, { responseType: 'json' })
      .pipe(map((data) => data));
  }

  UpdateStatus(taskId: number, newStatus: string): Observable<any> {
    let url = this.APIURL + `tasks/${taskId}`;

    return this.http.put(url, {
      status: newStatus,
    });
  }

  UpdateTask(taskId: number, task: any) {
    let url = this.APIURL + `tasks/${taskId}`;

    return this.http.put(url, task);
  }

  CreateTask(task: any) {
    let url = this.APIURL + 'tasks';

    return this.http.post(url, task);
  }

  DeleteTask(taskId: number) {
    let url = this.APIURL + `tasks/${taskId}`;

    return this.http.delete(url);
  }
}
