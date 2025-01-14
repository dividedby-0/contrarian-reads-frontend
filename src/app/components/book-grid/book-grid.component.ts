import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.css'
})
export class BookGridComponent {
  @Input() books: any[] | undefined;
}
