import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true, // Add standalone property
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Import RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if (this.userService.authenticateUser(email, password)) {
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({ email }));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.errorMessage = "Invalid email or password. Try again.";
    }
  }
}
