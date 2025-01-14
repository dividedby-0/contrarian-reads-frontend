import {Component} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {TopNavbarComponent} from "../top-navbar/top-navbar.component";
import {BookGridComponent} from "../book-grid/book-grid.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchBarComponent, TopNavbarComponent, BookGridComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  books = [
    {title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 2', author: 'Author 2', publisher: 'Publisher 2', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 3', author: 'Author 3', publisher: 'Publisher 3', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 4', author: 'Author 4', publisher: 'Publisher 4', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 5', author: 'Author 5', publisher: 'Publisher 5', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 6', author: 'Author 6', publisher: 'Publisher 6', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 7', author: 'Author 7', publisher: 'Publisher 7', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 8', author: 'Author 8', publisher: 'Publisher 8', cover: '../assets/images/mock-book-cover.jpg'},
    {title: 'Book 9', author: 'Author 9', publisher: 'Publisher 9', cover: '../assets/images/mock-book-cover.jpg'},
  ];
}
