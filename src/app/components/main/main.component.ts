import {Component, HostListener, OnInit} from '@angular/core';
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
import {PaginatedBooksRetrieve} from "../../models/paginated-books-retrieve";
import {SuggestionsService} from "../../services/suggestions.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchBarComponent, TopNavbarComponent, BookGridComponent, SpinnerComponent, AsyncPipe, NgIf,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  userId: string = '';
  booksWithSuggestions: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  lastCreatedAt: string | null = null;
  isLoading: boolean = false;
  hasMoreResults: boolean = true;
  remainingBooksCount: number = 0;
  noResultsMessage: string = '';
  suggestionCount: number = 0;
  showScrollButton: boolean = false;
  scrollY: number = 0;
  currentText = '';
  private searchTermSubject = new Subject<string>();
  private searchSubscription: Subscription = new Subscription();
  private refreshSubscription: Subscription = new Subscription();
  private phrases = [
    "Gain a different perspective",
    "Find the counterpoint",
    "Challenge your assumptions",
    "Explore opposing views",
    "See the other side",
    "Break your filter bubble"
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterTimer: any;

  constructor(
    public bookService: BookService,
    public loadingService: LoadingService,
    public eventService: EventService,
    private suggestionsService: SuggestionsService
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

    this.fetchSuggestionCount();
    this.refreshMainPageContent();
    this.startTypewriter();
  }

  private startTypewriter() {
    this.typeWriter();
  }

  private typeWriter() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentText = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = 80;

    if (this.isDeleting) {
      speed = 40;
    }

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 500;
    }

    this.typewriterTimer = setTimeout(() => this.typeWriter(), speed);
  }

  fetchSuggestionCount() {
    this.suggestionsService.getSuggestionCount().subscribe(count => {
      this.suggestionCount = count;
    });
  }

  ngOnDestroy() {
    clearTimeout(this.typewriterTimer);
    this.searchSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
  }

  refreshMainPageContent() {
    this.resetPagination();
    this.fetchSuggestionCount();
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

    this.bookService.searchBooks(this.searchTerm, this.userId, this.pageSize, this.lastCreatedAt)
      .subscribe({
        next: (response: PaginatedBooksRetrieve) => {
          this.booksWithSuggestions = this.lastCreatedAt
            ? [...this.booksWithSuggestions, ...response.booksWithSuggestions]
            : response.booksWithSuggestions;

          this.lastCreatedAt = response.nextCursor;
          this.hasMoreResults = response.hasMoreBooks;
          this.remainingBooksCount = response.remainingBooksCount;
        },
        error: (error) => {
          if (error.status === 404) {
            this.booksWithSuggestions = [];
            this.hasMoreResults = false;
            this.remainingBooksCount = 0;
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
    this.lastCreatedAt = null;
    this.hasMoreResults = true;
  }

  loadMore() {
    if (this.hasMoreResults && !this.isLoading) {
      this.loadBooks();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollY = window.scrollY;
    this.showScrollButton = this.scrollY > 300;
  }

  get headerOpacity(): number {
    return Math.max(0, 1 - this.scrollY / 200);
  }

  scrollToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
