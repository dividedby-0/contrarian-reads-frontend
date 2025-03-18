import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookRetrieve} from '../models/book-retrieve';
import {BookCreate} from "../models/book-create";

@Injectable({providedIn: 'root'})
export class BookService {
  private apiUrl = 'http://localhost:5093/api/books';

  constructor(private http: HttpClient) {
  }

  getBooks(pageSize: number = 10, lastEvaluatedKey: string | null = null): Observable<BookRetrieve[]> {
    let url = `${this.apiUrl}?pageSize=${pageSize}`;
    if (lastEvaluatedKey) {
      url += `&lastEvaluatedKey=${lastEvaluatedKey}`;
    }
    return this.http.get<BookRetrieve[]>(url);
  }

  getBook(id: string): Observable<BookRetrieve> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BookRetrieve>(url);
  }

  createBook(book: BookCreate): Observable<BookRetrieve> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<BookRetrieve>(this.apiUrl, book, {headers: headers});
  }

  updateBook(id: string, book: BookRetrieve): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, book);
  }

  deleteBook(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  searchBooks(searchTerm: string, pageSize: number = 20, lastEvaluatedKey: string | null = null): Observable<any> {
    let url = `${this.apiUrl}/search?searchTerm=${searchTerm}&pageSize=${pageSize}`;
    if (lastEvaluatedKey) {
      url += `&lastEvaluatedKey=${lastEvaluatedKey}`;
    }
    return this.http.get<any>(url);
  }
}
