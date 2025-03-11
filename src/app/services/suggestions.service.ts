import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuggestionCreate} from '../models/suggestion-create';
import {SuggestionRetrieve} from "../models/suggestion-retrieve";

@Injectable({providedIn: 'root'})
export class SuggestionsService {
  private apiUrl = 'http://localhost:5093/api/Suggestions';

  constructor(private http: HttpClient) {
  }

  getSuggestions(): Observable<SuggestionRetrieve[]> {
    return this.http.get<SuggestionRetrieve[]>(`${this.apiUrl}/all`);
  }

  getSuggestionCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getUpvotesCount(suggestionId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${suggestionId}/upvotes`);
  }

  getSuggestionById(suggestionId: string, userId: string | null): Observable<SuggestionRetrieve> {
    let params = new HttpParams().set('suggestionId', suggestionId);
    if (userId) {
      params = params.set('userId', userId);
    }

    return this.http.get<SuggestionRetrieve>(`${this.apiUrl}`, {params});
  }

  createSuggestion(suggestion: SuggestionCreate): Observable<SuggestionCreate> {
    return this.http.post<SuggestionCreate>(this.apiUrl, suggestion);
  }

  upvoteSuggestion(suggestionId: string, userId: string | null): Observable<any> {
    const url = `${this.apiUrl}/${suggestionId}/upvote?userId=${userId}`;
    return this.http.post(url, {});
  }
}
