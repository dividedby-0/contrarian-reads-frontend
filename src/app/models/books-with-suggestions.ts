import {BookRetrieve} from "./book-retrieve";
import {SuggestionRetrieve} from "./suggestion-retrieve";

export interface BooksWithSuggestions {
  book: BookRetrieve;
  suggestions: SuggestionRetrieve[];
}
