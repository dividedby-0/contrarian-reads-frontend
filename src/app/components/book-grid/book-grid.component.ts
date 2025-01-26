import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuggestionCreate} from "../../models/suggestion-create";
import {BooksWithSuggestions} from "../../models/books-with-suggestions";

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {
  @Input() booksWithSuggestions: BooksWithSuggestions[] = [];
}
