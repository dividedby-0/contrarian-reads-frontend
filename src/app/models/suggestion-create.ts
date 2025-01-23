export interface SuggestionCreate {
  bookId: string;
  suggestedBookId: string;
  suggestedByUserId: string;
  reason: string;
  upvotes: number;
}
