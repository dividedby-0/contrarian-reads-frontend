import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentRetrieve} from '../models/comment-retrieve';

@Injectable({providedIn: 'root'})
export class CommentService {
  private apiUrl = 'http://localhost:5093/api/Comments';

  constructor(private http: HttpClient) {
  }

  addComment(comment: any): Observable<CommentRetrieve> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<CommentRetrieve>(this.apiUrl, comment, {headers: headers});
  }

  getCommentsBySuggestionId(suggestionId: string) {
    return this.http.get<CommentRetrieve[]>(`${this.apiUrl}/${suggestionId}`);
  }
}
