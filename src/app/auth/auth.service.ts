import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // Import 'tap' for side effects

interface LoginResponse {
  token: string;
  // ... other properties your backend might return
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5093/api/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((response) => {
        // Store the JWT token in localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Helper method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
