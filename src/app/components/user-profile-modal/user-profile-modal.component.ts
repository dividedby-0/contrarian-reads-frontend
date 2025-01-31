import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {UserRetrieve} from "../../models/user-retrieve";
import {UserService} from "../../services/user.service";
import {DatePipe, NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
  ],
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './user-profile-modal.component.css'
})

export class UserProfileModalComponent implements OnInit {
  userData: UserRetrieve | undefined;
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    private snackbarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.userService.getUser(this.userId).subscribe({
        next: (data) => {
          this.userData = data;
        },
        error: (error) => {
          this.dialogRef.close();
          console.error('Error fetching user data:', error);
          this.snackbarService.showMessage('Failed to load user data.', 5000);
        },
        complete: () => {
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
