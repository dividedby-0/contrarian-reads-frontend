import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {GoogleBooksService} from "../../services/google-books.service";
import {debounceTime, Subject} from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../services/book.service";
import {SuggestionsService} from "../../services/suggestions.service";
import {SnackbarService} from "../../services/snackbar.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-add-alternative-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-alternative-modal.component.html',
  styleUrls: ['./add-alternative-modal.component.css']
})
export class AddAlternativeModalComponent {
  mainBook: string = '';
  suggestedAlternative: string = '';
  reason: string = '';
  selectedMainBook: any;
  selectedSuggestedAlternative: any;
  mainBookSuggestions: any[] = [];
  suggestedAlternativeSuggestions: any[] = [];
  remainingCharacters: number = 150;
  isMainBookEditable: boolean = true;

  private mainBookSearch$ = new Subject<string>();
  private suggestedAlternativeSearch$ = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<AddAlternativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private googleBooksService: GoogleBooksService,
    private bookService: BookService,
    private suggestionsService: SuggestionsService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {
    this.mainBookSearch$.pipe(debounceTime(300)).subscribe((query) => {
      this.searchMainBook(query);
    });

    this.suggestedAlternativeSearch$.pipe(debounceTime(300)).subscribe((query) => {
      this.searchSuggestedAlternative(query);
    });
  }

  ngOnInit(): void {
    if (this.data.mainBookData) {
      this.selectedMainBook = {
        volumeInfo: {
          title: this.data.mainBookData.title,
          authors: [this.data.mainBookData.author],
          description: this.data.mainBookData.description,
          imageLinks: {
            thumbnail: this.data.mainBookData.coverImageUrl
          },
        }
      }

      this.mainBook = `${this.selectedMainBook.volumeInfo.authors?.join(', ') || 'Unknown Author'} - ${this.selectedMainBook.volumeInfo.title}`;
      this.mainBookSuggestions = [];
      this.isMainBookEditable = false;
    }
  }

  onMainBookInput(): void {
    this.mainBookSearch$.next(this.mainBook);
    if (!this.mainBook) {
      this.selectedMainBook = null;
    }
  }

  onSuggestedAlternativeInput(): void {
    this.suggestedAlternativeSearch$.next(this.suggestedAlternative);
    if (!this.suggestedAlternative) {
      this.selectedSuggestedAlternative = null;
    }
  }

  searchMainBook(query: string): void {
    if (query.trim() === '') {
      this.mainBookSuggestions = [];
      return;
    }
    this.googleBooksService.searchBooks(query).subscribe((response) => {
      this.mainBookSuggestions = response.items || [];
    });
  }

  searchSuggestedAlternative(query: string): void {
    if (query.trim() === '') {
      this.suggestedAlternativeSuggestions = [];
      return;
    }
    this.googleBooksService.searchBooks(query).subscribe((response) => {
      this.suggestedAlternativeSuggestions = response.items || [];
    });
  }

  selectMainBook(book: any): void {
    this.selectedMainBook = book;
    const author = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
    const title = book.volumeInfo.title;
    this.mainBook = `${author} - ${title}`;
    this.mainBookSuggestions = [];
  }

  selectSuggestedAlternative(book: any): void {
    this.selectedSuggestedAlternative = book;
    const author = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
    const title = book.volumeInfo.title;
    this.suggestedAlternative = `${author} - ${title}`;
    this.suggestedAlternativeSuggestions = [];
  }

  updateRemainingCharacters(): void {
    this.remainingCharacters = 150 - this.reason.length;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.snackbarService.showMessage('Adding your suggestion...');
    const userId = this.authService.getUserId();

    this.bookService.createBook({
      title: this.selectedMainBook.volumeInfo.title,
      author: this.selectedMainBook.volumeInfo.authors?.join(', ') || 'Unknown Author',
      addedBy: userId!,
      description: this.selectedMainBook.volumeInfo.description || "",
      coverImageUrl: this.selectedMainBook.volumeInfo.imageLinks?.thumbnail || "",
    }).subscribe({
      next: (createdMainBook) => {
        console.log('Main BookRetrieve added:', createdMainBook);

        this.bookService.createBook({
          title: this.selectedSuggestedAlternative.volumeInfo.title,
          author: this.selectedSuggestedAlternative.volumeInfo.authors?.join(', ') || 'Unknown Author',
          addedBy: userId!,
          description: this.selectedSuggestedAlternative.volumeInfo.description || "",
          coverImageUrl: this.selectedSuggestedAlternative.volumeInfo.imageLinks?.thumbnail || "",
        }).subscribe({
          next: (createdSuggestedBook) => {
            console.log('Suggested BookRetrieve added:', createdSuggestedBook);

            this.suggestionsService.createSuggestion({
              bookId: createdMainBook.id,
              suggestedBookId: createdSuggestedBook.id,
              suggestedByUserId: userId!,
              reason: this.reason,
              upvotes: 0
            }).subscribe({
              next: (createdSuggestion) => {
                console.log('Suggestion added:', createdSuggestion);
                this.snackbarService.showMessage('Suggestion added successfully!', 3000);
                this.dialogRef.close();
              },
              error: (error) => {
                console.error('Error adding suggestion:', error);
                this.snackbarService.showMessage('Error adding suggestion. Please try again.', 5000);
              }
            });
          },
          error: (error) => {
            console.error('Error adding suggested book:', error);
            this.snackbarService.showMessage('Error adding suggested book. Please try again.', 5000);
          }
        });
      },
      error: (error) => {
        console.error('Error adding main book:', error);
        this.snackbarService.showMessage('Error adding main book. Please try again.', 5000);
      }
    });
  }
}
