import {Component, OnInit} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {TopNavbarComponent} from "../top-navbar/top-navbar.component";
import {BookGridComponent} from "../book-grid/book-grid.component";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LoadingService} from "../../services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Suggestion} from "../../models/suggestion";
import {SuggestionsService} from "../../services/suggestions.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchBarComponent, TopNavbarComponent, BookGridComponent, SpinnerComponent, AsyncPipe, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  books: Book[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    public bookService: BookService,
    public suggestionsService: SuggestionsService,
    public loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.loadingService.showSpinner();

    forkJoin({
      books: this.bookService.getBooks(),
      suggestions: this.suggestionsService.getSuggestions(),
    }).subscribe({
      next: ({books, suggestions}) => {
        this.books = books;
        this.suggestions = suggestions;

        console.log("fetching books", books);
        console.log("fetching suggestions", suggestions);

        this.books.forEach(book => {
          book.suggestions = this.suggestions.filter(s => s.bookId === book.id);
        });
        this.books = this.books.filter(book => book.suggestions?.length > 0);

        console.log("processed books", this.books);
      },
      error: (error) => {
        console.error("Error fetching data:", error);
      },
      complete: () => {
        this.loadingService.hideSpinner();
      }
    });
  }
}
