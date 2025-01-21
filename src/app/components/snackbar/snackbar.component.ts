import {Component} from '@angular/core';
import {SnackbarService} from '../../services/snackbar.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  message: string = '';

  constructor(private snackbarService: SnackbarService) {
    this.snackbarService.currentMessage$.subscribe(message => this.message = message);
  }
}
