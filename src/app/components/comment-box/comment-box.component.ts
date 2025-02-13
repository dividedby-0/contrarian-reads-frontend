import {Component, Input, OnInit} from '@angular/core';
import {CommentRetrieve} from '../../models/comment-retrieve';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, DatePipe],
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() comments: CommentRetrieve[] = [];
  @Input() nestingLevel: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  getRandomPastelColor(): string {
    const r = Math.floor(Math.random() * 56) + 190;
    const g = Math.floor(Math.random() * 56) + 190;
    const b = Math.floor(Math.random() * 56) + 190;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

}
