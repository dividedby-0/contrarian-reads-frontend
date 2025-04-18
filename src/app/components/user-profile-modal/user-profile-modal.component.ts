import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../../services/user.service";
import {DatePipe, NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {EventService} from "../../services/event.service";
import {UserProfileRetrieve} from "../../models/user-profile-retrieve";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    MatTab,
    MatTabGroup,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
  ],
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './user-profile-modal.component.css'
})

export class UserProfileModalComponent implements OnInit {
  userData: UserProfileRetrieve | undefined;
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    private snackbarService: SnackbarService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.userService.getUserProfile(this.userId).subscribe({
        next: (data) => {
          this.userData = data;
        },
        error: (error) => {
          this.dialogRef.close();
          console.error('Error fetching user profile:', error);
          this.snackbarService.showMessage('Error fetching user profile', 5000);
        },
        complete: () => {
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
    this.eventService.refreshMainPage();
  }
}
