import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AlternativeDetailsModalComponent} from "../alternative-details-modal/alternative-details-modal.component";

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
    @Inject(MAT_DIALOG_DATA) public data: { suggestions: any[] },
    private dialog: MatDialog
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
      } else if (this.orderBy === 'comments.length') {
        return b.comments.length - a.comments.length;
      } else if (this.orderBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return 0;
      }
    });
  }

  openAlternativeDetailsModal(suggestion: any) {
    this.dialogRef.close();

    this.dialog.open(AlternativeDetailsModalComponent, {
      data: {suggestion: suggestion}
    });
  }
}
