import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup; // Form group to manage login form controls
  errorMessage: string = '';
  // Injecting Router and UserService into the constructor
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

  // Method to handle login submission
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if (this.userService.authenticateUser(email, password)) {
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({ email }));
      this.router.navigateByUrl('/dashboard'); // navigate to dashboard
    } else {
      this.errorMessage = "Invalid email or password. Try again.";
    }
  }
}
