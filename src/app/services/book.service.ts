import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {Book} from '../models/book';
import {BookCreate} from "../models/book-create";

@Injectable({providedIn: 'root'})
export class BookService {
  private apiUrl = 'http://localhost:5093/api/books';

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  createBook(book: BookCreate): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Book): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, book);
  }

  deleteBook(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
