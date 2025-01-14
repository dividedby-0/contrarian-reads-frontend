export interface Suggestion {
  id: string;
  bookId: string;
  suggestedBookId: string;
  suggestedBy: string;
  reason: string;
  upvotes: number;
}
