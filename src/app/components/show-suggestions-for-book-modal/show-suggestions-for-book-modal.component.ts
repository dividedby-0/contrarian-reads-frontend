import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-show-suggestions-for-book-modal',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './show-suggestions-for-book-modal.component.html',
  styleUrl: './show-suggestions-for-book-modal.component.css'
})
export class ShowSuggestionsForBookModalComponent {
  searchTerm: string = '';
  filteredSuggestions: any[] = [];

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
  }
}
