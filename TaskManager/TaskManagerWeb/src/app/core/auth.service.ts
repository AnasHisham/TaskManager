import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.APIURL;
  }

  login(username: string, password: string) {
    const url = this.apiUrl + 'auth';
    let data = {
      username: username,
      password: password,
    };
    return this.http.post<{ token: string }>(`${url}/login`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roleClaim =
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    return payload[roleClaim];
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const nameClaim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    return payload[nameClaim];
  }
}
