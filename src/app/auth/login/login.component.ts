import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Form group to manage login form inputs
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
      // Initializing the login form with email and password fields and validation rules
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
    if (this.loginForm.invalid) {  // Prevent submission if the form is invalid
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.userService.authenticateUser(email, password).subscribe(user => {  // Call the authentication service to validate user credentials
      if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        console.log("Login successful! Redirecting...");
        this.router.navigate(['/dashboard']); // navigates to dashboard
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    }, error => {
      console.error('Authentication error:', error);
    });
  }
  
}
