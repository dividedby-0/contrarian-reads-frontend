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

// books = [
//   {
//     title: 'Book 1',
//     author: 'Author 1',
//     publisher: 'Publisher 1',
//     cover: '../assets/images/mock-book-cover.jpg',
//     suggestedBooks: [
//       {
//         title: 'Suggested Book 1',
//         author: 'Suggested Author 1',
//         suggestedBy: 'Suggested By 1',
//         reason: 'Suggested Reason 1',
//         upvotes: 10,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 2',
//         author: 'Suggested Author 2',
//         suggestedBy: 'Suggested By 2',
//         reason: 'Suggested Reason 2',
//         upvotes: 20,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 3',
//         author: 'Suggested Author 3',
//         suggestedBy: 'Suggested By 3',
//         reason: 'Suggested Reason 3',
//         upvotes: 30,
//         cover: '../assets/images/mock-book-cover.jpg'
//       }
//     ]
//   },
//   {
//     title: 'Book 2',
//     author: 'Author 2',
//     publisher: 'Publisher 2',
//     cover: '../assets/images/mock-book-cover.jpg',
//     suggestedBooks: [
//       {
//         title: 'Suggested Book 4',
//         author: 'Suggested Author 4',
//         suggestedBy: 'Suggested By 4',
//         reason: 'Suggested Reason 4',
//         upvotes: 40,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 5',
//         author: 'Suggested Author 5',
//         suggestedBy: 'Suggested By 5',
//         reason: 'Suggested Reason 5',
//         upvotes: 50,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 6',
//         author: 'Suggested Author 6',
//         suggestedBy: 'Suggested By 6',
//         reason: 'Suggested Reason 6',
//         upvotes: 60,
//         cover: '../assets/images/mock-book-cover.jpg'
//       }
//     ]
//   },
//   {
//     title: 'Book 3',
//     author: 'Author 3',
//     publisher: 'Publisher 3',
//     cover: '../assets/images/mock-book-cover.jpg',
//     suggestedBooks: [
//       {
//         title: 'Suggested Book 7',
//         author: 'Suggested Author 7',
//         suggestedBy: 'Suggested By 7',
//         reason: 'Suggested Reason 7',
//         upvotes: 70,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 8',
//         author: 'Suggested Author 8',
//         suggestedBy: 'Suggested By 8',
//         reason: 'Suggested Reason 8',
//         upvotes: 80,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 9',
//         author: 'Suggested Author 9',
//         suggestedBy: 'Suggested By 9',
//         reason: 'Suggested Reason 9',
//         upvotes: 90,
//         cover: '../assets/images/mock-book-cover.jpg'
//       }
//     ]
//   },
//   {
//     title: 'Book 4',
//     author: 'Author 4',
//     publisher: 'Publisher 4',
//     cover: '../assets/images/mock-book-cover.jpg',
//     suggestedBooks: [
//       {
//         title: 'Suggested Book 10',
//         author: 'Suggested Author 10',
//         suggestedBy: 'Suggested By 10',
//         reason: 'Suggested Reason 10',
//         upvotes: 100,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 11',
//         author: 'Suggested Author 11',
//         suggestedBy: 'Suggested By 11',
//         reason: 'Suggested Reason 11',
//         upvotes: 110,
//         cover: '../assets/images/mock-book-cover.jpg'
//       },
//       {
//         title: 'Suggested Book 12',
//         author: 'Suggested Author 12',
//         suggestedBy: 'Suggested By 12',
//         reason: 'Suggested Reason 12',
//         upvotes: 120,
//         cover: '../assets/images/mock-book-cover.jpg'
//       }
//     ]
//   },
// ];
