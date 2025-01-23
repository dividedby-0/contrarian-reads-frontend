import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = environment.googleBooksApiKey;

  constructor(private http: HttpClient) {
  }

  searchBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(query)}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
