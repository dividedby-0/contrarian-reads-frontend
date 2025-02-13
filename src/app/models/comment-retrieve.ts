import {UserRetrieve} from "./user-retrieve";

export interface CommentRetrieve {
  id: string;
  suggestionId: string;
  user: UserRetrieve;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  replies: CommentRetrieve[];
}
