import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {SnackbarService} from "../../services/snackbar.service";
import {AddAlternativeModalComponent} from "../add-alternative-modal/add-alternative-modal.component";
import {MainComponent} from "../main/main.component";
import {SuggestionsService} from "../../services/suggestions.service";

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  suggestionCount: number = 0;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private snackbarService: SnackbarService, private mainComponent: MainComponent, private suggestionsService: SuggestionsService) {
    this.fetchSuggestionCount();
  }

  fetchSuggestionCount() {
    this.suggestionsService.getSuggestionCount().subscribe(count => {
      this.suggestionCount = count;
    });
  }

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.snackbarService.showMessage('You have been logged out.');
      }
    });
  }

  openAddAlternativeModal() {
    const dialogRef = this.dialog.open(AddAlternativeModalComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainComponent.loadBooks();
      }
    });
  }
}
