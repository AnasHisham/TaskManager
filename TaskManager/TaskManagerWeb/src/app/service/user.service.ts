import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  APIURL: string;

  constructor(private http: HttpClient) {
    this.APIURL = environment.APIURL;
  }

  GetUsers(): Observable<any> {
    let url = this.APIURL + 'Users';

    return this.http
      .get<any[]>(url, { responseType: 'json' })
      .pipe(map((data) => data));
  }

  UpdateUser(userId: number, user: any) {
    let url = this.APIURL + `users/${userId}`;

    return this.http.put(url, user);
  }

  CreateUser(user: any) {
    let url = this.APIURL + 'users';

    return this.http.post(url, user);
  }

  DeleteUser(userId: number) {
    let url = this.APIURL + `users/${userId}`;

    return this.http.delete(url);
  }
}
