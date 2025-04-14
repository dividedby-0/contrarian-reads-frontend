import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors, ValidatorFn
} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SnackbarService} from '../../services/snackbar.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    MatFormFieldModule,
    MatButton,
    MatInput
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.createUsernameValidator()
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        this.createPasswordStrengthValidator()
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      profilePictureUrl: ['', [
        Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg|gif|webp))')
      ]],
      bio: ['', [
        Validators.maxLength(150),
        // prevent script injection
        Validators.pattern('^[^<>]*$')
      ]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  private createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);

      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !valid ? {passwordStrength: true} : null;
    };
  }

  private createUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
      const hasSpace = /\s/.test(value);

      if (hasSpecialChar || hasSpace) {
        return {invalidUsername: true};
      }

      return null;
    };
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({passwordMismatch: true});
      return {passwordMismatch: true};
    }

    return null;
  }

  onSubmit() {
    const credentials = {
      ...this.registerForm.value,
      createdAt: new Date()
    };

    this.authService.register(credentials).subscribe({
      next: () => {

      },
      error: (err) => {
        this.snackbarService.showMessage(err, 5000);
        console.error('Registration error:', err);
      },
      complete: () => {
        this.snackbarService.hideMessage()
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }
    });
  }
}
