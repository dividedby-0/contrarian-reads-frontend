import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SuggestionCreate} from "../../models/suggestion-create";
import {BooksWithSuggestions} from "../../models/books-with-suggestions";
import {SuggestionRetrieve} from "../../models/suggestion-retrieve";
import {AlternativeDetailsModalComponent} from "../alternative-details-modal/alternative-details-modal.component";

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule, AlternativeDetailsModalComponent],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {

  constructor(private dialog: MatDialog) {
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
    this.dialog.open(AlternativeDetailsModalComponent, {
      data: {suggestion: suggestion}
    });
  }
}
