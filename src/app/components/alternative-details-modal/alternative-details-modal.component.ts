import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuggestionRetrieve} from '../../models/suggestion-retrieve';
import {DatePipe, NgIf} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {CommentService} from "../../services/comment.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CommentRetrieve} from "../../models/comment-retrieve";

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
  alternativeData: SuggestionRetrieve;
  newCommentText: string = '';
  comments: CommentRetrieve[] = [];

  constructor(
    public dialogRef: MatDialogRef<AlternativeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService
  ) {
    this.alternativeData = data.suggestion;
  }

  ngOnInit() {
    this.commentService.getCommentsBySuggestionId(this.alternativeData.id).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment(commentContent: string) {
    const newComment = {
      suggestionId: this.alternativeData.id,
      commentedByUserId: localStorage.getItem("userId"),
      content: commentContent
    };

    this.commentService.addComment(newComment)
      .subscribe({
        next: (createdComment) => {
          console.log('Comment added:', createdComment);
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    this.newCommentText = '';
  }

  addUpvote() {
    //TODO: upvote logic
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
