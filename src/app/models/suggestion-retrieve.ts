import {BookRetrieve} from "./book-retrieve";
import {UserRetrieve} from "./user-retrieve";
import {CommentRetrieve} from "./comment-retrieve";

export interface SuggestionRetrieve {
  id: string;
  createdAt: Date;
  reason: string;
  suggestedBook: BookRetrieve;
  suggestedByUser: UserRetrieve;
  upvoteCount: number;
  userHasUpvoted: boolean;
  comments: CommentRetrieve[];
}
