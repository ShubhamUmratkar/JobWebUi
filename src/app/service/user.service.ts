import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken()); // Initialized with token check
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Expose as observable to subscribe to login status

  constructor(private http: HttpClient) { }

  // Method to register a new user
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user/register`, user, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => {
          console.log('Registration response:', response);
          if (response === 'User registered successfully.') {
            return { success: true, message: response };
          } else {
            return { success: false, message: 'Registration failed. Please try again.' };
          }
        }),
        catchError((error) => {
          console.error('Registration failed', error);
          return throwError(() => new Error('Registration failed. Please try again later.'));
        })
      );
  }

  // Method to login user
  loginUser(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { userName, password };

    return this.http.post(`${this.baseUrl}/user/login`, body, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => {
          console.log('Login response:', response);
          if (response === 'Login successful.') {
            this.setLoggedIn(true);  // Update the login status on successful login
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login failed', error);
          return throwError(() => new Error('Login failed. Please try again later.'));
        })
      );
  }

  // Method to fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch users', error);
          return throwError(() => new Error('Failed to fetch users. Please try again later.'));
        })
      );
  }

  // Utility method to check if user is already logged in
  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');  // Check if token exists in localStorage
  }

  // Update logged-in status and store it in localStorage
  private setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);  // Update the BehaviorSubject
    if (status) {
      localStorage.setItem('currentUser', 'loggedIn');  // Save to localStorage if logged in
    } else {
      localStorage.removeItem('currentUser');  // Remove from localStorage if logged out
    }
  }

  // Logout user
  logout(): void {
    console.log('Logging out...');
    this.setLoggedIn(false);  // Update login status to false
  }
}
