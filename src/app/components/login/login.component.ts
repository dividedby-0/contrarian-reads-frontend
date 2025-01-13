import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {email: '', password: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // Redirect to the main page after successful login
        this.router.navigate(['/main']);
      },
      error: (error) => {
        // Handle login errors (e.g., display an error message)
        this.errorMessage = 'Invalid email or password.';
        console.error('Login error:', error);
      }
    });
  }
}
