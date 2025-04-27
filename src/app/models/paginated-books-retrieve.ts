export interface PaginatedBooksRetrieve {
  booksWithSuggestions: any[];
  hasMoreBooks: boolean;
  remainingBooksCount: number;
  nextCursor: string;
}
