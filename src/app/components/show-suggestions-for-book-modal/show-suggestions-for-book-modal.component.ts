import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-show-suggestions-for-book-modal',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './show-suggestions-for-book-modal.component.html',
  styleUrl: './show-suggestions-for-book-modal.component.css'
})
export class ShowSuggestionsForBookModalComponent {
  searchTerm: string = '';
  filteredSuggestions: any[] = [];
  orderBy: string = 'upvoteCount';

  constructor(
    public dialogRef: MatDialogRef<ShowSuggestionsForBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { suggestions: any[] }
  ) {
    this.filteredSuggestions = this.data.suggestions;
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  filterSuggestions() {
    this.filteredSuggestions = this.data.suggestions.filter(suggestion => {
      const titleMatch = suggestion.suggestedBook.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const authorMatch = suggestion.suggestedBook.author.toLowerCase().includes(this.searchTerm.toLowerCase());

      return titleMatch || authorMatch;
    });
    this.sortSuggestions();
  }

  sortSuggestions() {
    this.filteredSuggestions.sort((a, b) => {
      if (this.orderBy === 'upvoteCount') {
        return b.upvoteCount - a.upvoteCount;
      } else {
        return b.comments.length - a.comments.length;
      }
    });
  }

}
