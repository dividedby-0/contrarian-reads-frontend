import {Component, Input} from '@angular/core';
import {CommentRetrieve} from '../../models/comment-retrieve';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatList,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Input() comments: CommentRetrieve[] = [];
  newCommentText: string = '';

  addComment() {
    // Implement your logic to add the new comment here.
    // You'll likely need a service to send the comment to your backend.

    // After adding the comment:
    this.newCommentText = ''; // Clear the input field
  }

  getReplies(comment: CommentRetrieve): CommentRetrieve[] {
    return this.comments.filter(reply => reply.parentId === comment.id);
  }
}
