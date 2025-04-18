import {UserRetrieve} from "./user-retrieve";
import {SuggestionRetrieve} from "./suggestion-retrieve";
import {CommentRetrieve} from "./comment-retrieve";

export interface UserProfileRetrieve {
  user: UserRetrieve,
  addedSuggestions: SuggestionRetrieve[],
  upvotedSuggestions: SuggestionRetrieve[],
  comments: CommentRetrieve[]
}
