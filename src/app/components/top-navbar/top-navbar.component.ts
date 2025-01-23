import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {SnackbarService} from "../../services/snackbar.service";
import {AddAlternativeModalComponent} from "../add-alternative-modal/add-alternative-modal.component";
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, ConfirmationDialogComponent, AddAlternativeModalComponent],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private snackbarService: SnackbarService, private mainComponent: MainComponent) {
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
        this.mainComponent.fetchData();
      }
    });
  }
}
