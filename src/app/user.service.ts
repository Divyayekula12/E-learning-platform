import { Injectable } from '@angular/core';
import { SignUpModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'myUsers';
  private loggedUserKey = 'loggedUser';

  getUsers(): SignUpModel[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUsers(users: SignUpModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  addUser(user: SignUpModel): boolean {
    const users = this.getUsers();
    
    if (users.some(u => u.email === user.email)) {
      return false; 
    }

    users.push(user);
    this.saveUsers(users);
    return true;
  }

  authenticateUser(email: string, password: string): boolean {
    const users = this.getUsers();
    const authenticatedUser = users.find(user => user.email === email && user.password === password);
    
    if (authenticatedUser) {
      localStorage.setItem(this.loggedUserKey, JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedUserKey) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.loggedUserKey);
  }
}
