import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuggestionCreate} from '../models/suggestion-create';
import {SuggestionRetrieve} from "../models/suggestion-retrieve";

@Injectable({providedIn: 'root'})
export class SuggestionsService {
  private apiUrl = 'http://localhost:5093/api/Suggestions';

  constructor(private http: HttpClient) {
  }

  getSuggestions(): Observable<SuggestionRetrieve[]> {
    return this.http.get<SuggestionRetrieve[]>(this.apiUrl);
  }

  getSuggestionCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getSuggestionById(id: string): Observable<SuggestionRetrieve> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SuggestionRetrieve>(url);
  }

  createSuggestion(suggestion: SuggestionCreate): Observable<SuggestionCreate> {
    return this.http.post<SuggestionCreate>(this.apiUrl, suggestion);
  }
}
