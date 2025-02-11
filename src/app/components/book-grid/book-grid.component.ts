import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuggestionCreate} from "../../models/suggestion-create";
import {BooksWithSuggestions} from "../../models/books-with-suggestions";
import {SuggestionRetrieve} from "../../models/suggestion-retrieve";

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {
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
}
