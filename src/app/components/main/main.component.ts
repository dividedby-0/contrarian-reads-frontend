import {Component, OnInit} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {TopNavbarComponent} from "../top-navbar/top-navbar.component";
import {BookGridComponent} from "../book-grid/book-grid.component";
import {BookService} from "../../services/book.service";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LoadingService} from "../../services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchBarComponent, TopNavbarComponent, BookGridComponent, SpinnerComponent, AsyncPipe, NgIf,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  booksWithSuggestions: [] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  lastEvaluatedKey: string | null = null;
  isLoading: boolean = false;
  hasMoreResults: boolean = true;
  noResultsMessage: string = '';
  private searchTermSubject = new Subject<string>();

  constructor(
    public bookService: BookService,
    public loadingService: LoadingService,
    public eventService: EventService
  ) {
  }

  ngOnInit() {
    this.refreshMainPageContent();
    
    this.eventService.event$.subscribe(() => {
      this.refreshMainPageContent();
    });
  }

  refreshMainPageContent() {
    this.loadBooks();
    this.searchTermSubject.next('');
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.resetPagination();
    this.searchTermSubject.next(searchTerm);
  }

  loadBooks() {
    this.loadingService.showSpinner();

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.searchTermSubject.pipe(debounceTime(800)).subscribe(() => {
      this.bookService.searchBooks(this.searchTerm, this.pageSize, this.lastEvaluatedKey)
        .subscribe({
          next: (data) => {
            this.booksWithSuggestions = this.lastEvaluatedKey
              ? [...this.booksWithSuggestions, ...data.booksWithSuggestions]
              : data.booksWithSuggestions;
            this.lastEvaluatedKey = data.nextLastEvaluatedKey;
            this.hasMoreResults = !!this.lastEvaluatedKey;
          },
          error: (error) => {
            if (error.status === 404) {
              this.booksWithSuggestions = [];
              this.hasMoreResults = false;
              this.isLoading = false;
              this.loadingService.hideSpinner();
              this.noResultsMessage = "Nothing found :(";
            } else {
              console.error('Error loading books:', error);
            }
          },
          complete: () => {
            this.isLoading = false;
            this.loadingService.hideSpinner();
          }
        });
    });
  }

  resetPagination() {
    this.lastEvaluatedKey = null;
    this.hasMoreResults = true;
  }

  loadMore() {
    this.loadBooks();
  }
}
