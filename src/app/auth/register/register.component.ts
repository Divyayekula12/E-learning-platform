import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SignUpModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./register.component.css'],
  providers: [UserService] 
})
export class RegisterComponent {
  registerForm!: FormGroup;  
  user: SignUpModel = new SignUpModel();

  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {  // Ensure the form is valid before proceeding
      const userData = this.registerForm.value;
 
      const button = document.querySelector('button');
      if (button) button.setAttribute('disabled', 'true');
  
      this.userService.addUser(userData).subscribe(
        response => {
          alert("User registered Succesfully!!");
          this.router.navigate(['/login']); // Redirect to the login page
          this.registerForm.reset();  // Reset the form fields
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
  

  isInvalid(field: string): boolean {
    return (
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    ) as boolean;
  }
}

