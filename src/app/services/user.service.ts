import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRetrieve} from '../models/user-retrieve';
import {UserProfileRetrieve} from "../models/user-profile-retrieve";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5093/api/users';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<UserRetrieve> {
    const url = `${this.apiUrl}/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserRetrieve>(url, {headers: headers});
  }

  getUserProfile(userId: string): Observable<UserProfileRetrieve> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserProfileRetrieve>(`${this.apiUrl}/profile/${userId}`, {headers});
  }

}
