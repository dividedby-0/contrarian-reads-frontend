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
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './user-profile-modal.component.css'
})

export class UserProfileModalComponent implements OnInit {
  userData: UserProfileRetrieve | undefined;
  userId: string | null = null;
  isLoading = true;
  isEditing = false;
  editForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    private snackbarService: SnackbarService,
    private eventService: EventService,
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      profilePictureUrl: ['', [Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg|gif|webp))')]],
      bio: ['', [Validators.maxLength(150), Validators.pattern('^[^<>]*$')]]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.userService.getUserProfile(this.userId).subscribe({
        next: (data) => {
          this.userData = data;
          this.isLoading = false;
          this.editForm.patchValue({
            profilePictureUrl: data.user.profilePictureUrl || '',
            bio: data.user.bio || ''
          });
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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.userData) {
      this.editForm.patchValue({
        profilePictureUrl: this.userData.user.profilePictureUrl || '',
        bio: this.userData.user.bio || ''
      });
    }
  }

  saveProfile(): void {
    if (this.editForm.invalid || !this.userId || !this.userData) return;

    const updatedData = {
      username: this.userData.user.username,
      email: this.userData.user.email,
      profilePictureUrl: this.editForm.value.profilePictureUrl || null,
      bio: this.editForm.value.bio || null
    };

    this.userService.updateUserProfile(this.userId, updatedData).subscribe({
      next: () => {
        this.snackbarService.showMessage('Profile updated successfully', 3000);
        this.userData!.user.profilePictureUrl = updatedData.profilePictureUrl || undefined;
        this.userData!.user.bio = updatedData.bio || undefined;
        this.isEditing = false;
      },
      error: (err) => {
        this.snackbarService.showMessage('Error updating profile', 5000);
        console.error('Profile update error:', err);
      }
    });
  }

  onAvatarError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('default-avatar.png')) {
      img.src = '/assets/images/default-avatar.png';
    }
  }

  onClose(): void {
    this.dialogRef.close();
    this.eventService.refreshMainPage();
  }
}
