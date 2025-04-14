import {Component, OnInit} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {TopNavbarComponent} from "../top-navbar/top-navbar.component";
import {BookGridComponent} from "../book-grid/book-grid.component";
import {BookService} from "../../services/book.service";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LoadingService} from "../../services/loading.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {debounceTime} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchBarComponent, TopNavbarComponent, BookGridComponent, SpinnerComponent, AsyncPipe, NgIf,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  userId: string = '';
  booksWithSuggestions: [] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  lastEvaluatedKey: string | null = null;
  isLoading: boolean = false;
  hasMoreResults: boolean = true;
  noResultsMessage: string = '';
  private searchTermSubject = new Subject<string>();
  private searchSubscription: Subscription = new Subscription();
  private refreshSubscription: Subscription = new Subscription();

  constructor(
    public bookService: BookService,
    public loadingService: LoadingService,
    public eventService: EventService
  ) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    this.searchSubscription = this.searchTermSubject.pipe(
      debounceTime(800)
    ).subscribe(() => {
      this.fetchBooks();
    });

    this.refreshSubscription = this.eventService.refreshMainPage$.subscribe(() => {
      this.refreshMainPageContent();
    });

    this.refreshMainPageContent();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
  }

  refreshMainPageContent() {
    this.resetPagination();
    this.searchTermSubject.next('');
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.resetPagination();
    this.searchTermSubject.next(searchTerm);
  }

  loadBooks() {
    if (!this.isLoading) {
      this.searchTermSubject.next(this.searchTerm);
    }
  }

  fetchBooks() {
    this.loadingService.showSpinner();

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.bookService.searchBooks(this.searchTerm, this.userId, this.pageSize, this.lastEvaluatedKey)
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
  }

  resetPagination() {
    this.lastEvaluatedKey = null;
    this.hasMoreResults = true;
  }

  loadMore() {
    // TODO reimplement pagination
    this.loadBooks();
  }
}
