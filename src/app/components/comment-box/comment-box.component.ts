import {Component, Input, OnInit} from '@angular/core';
import {CommentRetrieve} from '../../models/comment-retrieve';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {CommentCreate} from "../../models/comment-create";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, DatePipe, NgClass],
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() comments: CommentRetrieve[] = [];
  @Input() nestingLevel: number = 0;
  replyingToCommentId: string | null = null;
  charCount: number = 0;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
  }

  getRandomPastelColor(): string {
    const r = Math.floor(Math.random() * 56) + 190;
    const g = Math.floor(Math.random() * 56) + 190;
    const b = Math.floor(Math.random() * 56) + 190;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  toggleReply(commentId: string) {
    this.replyingToCommentId = this.replyingToCommentId === commentId ? null : commentId;
  }

  updateCharCount(typedText: string) {
    this.charCount = typedText.length;
  }

  addReply(comment: any, replyContent: string) {

    const newReply: CommentCreate = {
      suggestionId: comment.suggestionId,
      content: replyContent,
      commentedByUserId: localStorage.getItem("userId") || '',
      parentId: comment.id
    };

    this.commentService.addComment(newReply)
      .subscribe({
        next: (createdComment) => {
          console.log('Reply added:', createdComment);
        },
        error: (error) => {
          console.error('Error adding reply:', error);
        },
        complete: () => {
          this.replyingToCommentId = null;
          this.refreshComments(comment.suggestionId);
        }
      });
  }

  refreshComments(suggestionId: string) {
    this.commentService.getCommentsBySuggestionId(suggestionId).subscribe({
      next: (comments) => {
        this.comments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (error) => {
        console.error('Error retrieving comments:', error);
      }
    });
  }
}
