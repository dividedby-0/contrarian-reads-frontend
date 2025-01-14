import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Suggestion} from '../models/suggestion';

@Injectable({providedIn: 'root'})
export class SuggestionsService {
  private apiUrl = 'http://localhost:5093/api/Suggestions';

  constructor(private http: HttpClient) {
  }

  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.apiUrl);
  }

  getSuggestionById(id: string): Observable<Suggestion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Suggestion>(url);
  }

  createSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.apiUrl, suggestion);
  }
}
