import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = 'http://localhost:5093/api';

  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  register(user: { password: string; email: string; username: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}
