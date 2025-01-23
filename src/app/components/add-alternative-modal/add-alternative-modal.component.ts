import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {GoogleBooksService} from "../../services/google-books.service";
import {debounceTime, Subject} from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";

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

  private mainBookSearch$ = new Subject<string>();
  private suggestedAlternativeSearch$ = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<AddAlternativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private googleBooksService: GoogleBooksService
  ) {
    this.mainBookSearch$.pipe(debounceTime(300)).subscribe((query) => {
      this.searchMainBook(query);
    });

    this.suggestedAlternativeSearch$.pipe(debounceTime(300)).subscribe((query) => {
      this.searchSuggestedAlternative(query);
    });
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
    console.log('Main Book:', this.mainBook);
    console.log('Suggested Alternative:', this.suggestedAlternative);
    console.log('Reason:', this.reason);
    this.dialogRef.close();
  }
}
