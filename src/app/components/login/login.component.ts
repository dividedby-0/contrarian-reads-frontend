import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {email: '', password: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) {
  }

  onSubmit() {
    this.snackbarService.showMessage('Logging in...');
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password.';
        console.error('Login error:', error);
      },
      complete: () => {
        this.snackbarService.hideMessage();
      }
    });
  }
}
