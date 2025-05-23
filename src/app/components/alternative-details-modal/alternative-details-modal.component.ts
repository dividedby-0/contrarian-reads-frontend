import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe, NgIf} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {CommentService} from "../../services/comment.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CommentRetrieve} from "../../models/comment-retrieve";
import {SuggestionsService} from "../../services/suggestions.service";
import {CommentCreate} from "../../models/comment-create";

@Component({
  selector: 'app-suggested-book-modal',
  standalone: true,
  imports: [
    NgIf,
    CommentBoxComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    DatePipe
  ],
  templateUrl: './alternative-details-modal.component.html',
  styleUrl: './alternative-details-modal.component.css'
})
export class AlternativeDetailsModalComponent implements OnInit {

  newCommentText: string = '';
  comments: CommentRetrieve[] = [];
  upvoteAlreadyExists = false;

  constructor(
    public dialogRef: MatDialogRef<AlternativeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService,
    private suggestionsService: SuggestionsService
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.upvoteAlreadyExists = this.data.suggestion.upvoteAlreadyExists;
    this.refreshUpvotesCount();
    this.refreshComments();
  }

  ngOnChanges() {
    this.refreshUpvotesCount();
    this.refreshComments();
  }

  refreshUpvotesCount() {
    this.suggestionsService.getUpvotesCount(this.data.suggestion.id).subscribe({
      next: (upvotesCount) => {
        this.data.suggestion.upvotesCount = upvotesCount;
      },
      error: (error) => {
        console.error('Error retrieving upvotes count:', error);
      }
    })
  }

  refreshComments() {
    this.commentService.getCommentsBySuggestionId(this.data.suggestion.id).subscribe({
      next: (comments) => {
        this.comments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (error) => {
        console.error('Error retrieving comments:', error);
      }
    });
  }

  addComment(commentContent: string) {
    const newComment: CommentCreate = {
      suggestionId: this.data.suggestion.id,
      content: commentContent,
      commentedByUserId: localStorage.getItem("userId") || '',
    };

    this.commentService.addComment(newComment)
      .subscribe({
        next: (createdComment) => {
          this.refreshComments();
          console.log('Comment added:', createdComment);
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    this.newCommentText = '';
  }

  toggleUpvote(suggestionId: string) {
    const userId = localStorage.getItem("userId");

    if (typeof userId === 'string') {
      this.suggestionsService.upvoteSuggestion(suggestionId, userId).subscribe({
        next: (response) => {
          console.log('Upvote successful:', response);
          this.upvoteAlreadyExists = response.upvoteAlreadyExists;
        },
        error: (error) => {
          console.error('Error upvoting suggestion:', error);
        },
        complete: () => {
          console.log('Upvote operation complete.');
          this.refreshUpvotesCount();
        }
      });
    } else {
      console.error('Error upvoting suggestion: userId is not a string');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
