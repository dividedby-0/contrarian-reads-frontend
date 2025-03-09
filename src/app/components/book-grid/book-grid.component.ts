import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {BooksWithSuggestions} from "../../models/books-with-suggestions";
import {SuggestionRetrieve} from "../../models/suggestion-retrieve";
import {AlternativeDetailsModalComponent} from "../alternative-details-modal/alternative-details-modal.component";
import {SuggestionsService} from "../../services/suggestions.service";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule, AlternativeDetailsModalComponent],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {

  constructor(private dialog: MatDialog, private suggestionsService: SuggestionsService, private eventService: EventService) {
  }

  @Input() booksWithSuggestions: BooksWithSuggestions[] = [];
  topSuggestions: SuggestionRetrieve[][] = [];

  ngOnChanges() {
    this.updateTopSuggestions();
  }

  private updateTopSuggestions() {
    this.topSuggestions = this.booksWithSuggestions.map(
      ({suggestions}) => suggestions.sort((a, b) => b.upvoteCount - a.upvoteCount).slice(0, 2)
    );
  }

  openSuggestedBookModal(suggestion: SuggestionRetrieve) {
    this.suggestionsService.getSuggestionById(suggestion.id).subscribe({
      next: (suggestion) => {
        const dialogRef = this.dialog.open(AlternativeDetailsModalComponent, {
          data: {suggestion: suggestion}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.eventService.refreshMainPage();
        });
      },
      error: (error) => {
        console.error('Error retrieving suggestion data:', error);
      }
    })
  }
}
