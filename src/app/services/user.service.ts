import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRetrieve} from '../models/user-retrieve';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5093/api/users';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<UserRetrieve> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserRetrieve>(url);
  }
}
