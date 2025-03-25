import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Defining a form group for handling registration
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
   // Method to check if a form control is invalid and has been touched
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;  
    }
  
    if (this.userService.addUser(this.registerForm.value)) {
      alert('Registration Successful');
      this.registerForm.reset(); 
  
      console.log('Navigating to login...'); 
      // Navigate to the login page after successful registration
      this.router.navigate(['/login']).then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.log('Navigation failed');
        }
      });
  
    } else {
      alert('User already registered with this email'); // Shows error if user already exists
    }
  }
  
}
