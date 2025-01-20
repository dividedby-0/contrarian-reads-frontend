import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {UserCreate} from "../../models/user-create";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  credentials: UserCreate = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePictureUrl: '',
    createdAt: new Date(),
    bio: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  checkPasswords() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.credentials).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}

