import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpModel } from '../models/user.model';

@Injectable({
  providedIn: 'root' 
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<SignUpModel[]> {
    return this.http.get<SignUpModel[]>(this.apiUrl);
  }

  addUser(user: SignUpModel): Observable<SignUpModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignUpModel>(this.apiUrl, user, { headers });
  }

  authenticateUser(email: string, password: string): Observable<SignUpModel | null> {
    return new Observable(observer => {
      this.getUsers().subscribe(users => {
        const authenticatedUser = users.find(user => user.email === email && user.password === password) || null;
        observer.next(authenticatedUser);
        observer.complete();
      });
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedUser') !== null;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }
}
