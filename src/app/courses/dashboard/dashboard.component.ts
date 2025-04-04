import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUpModel } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loggedUser: SignUpModel | null = null;

  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser) {
      this.loggedUser = JSON.parse(localUser) as SignUpModel; 
    }
  }

  onLogout(): void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Clears cached routes
    });
  }
}
