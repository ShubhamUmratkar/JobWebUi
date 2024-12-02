// src/app/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../model/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin'; // Backend API URL
  adminNameSubject: any;

  constructor(private http: HttpClient) {}

  registerAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerAdmin `,admin);
  }



  /**
   * Login Admin
   * @param username - Admin username
   * @param password - Admin password
   * @returns Observable<string>
   */
  loginAdmin(username: string, password: string): Observable<string> {
    const body = { username, password }; // Send credentials in the body
 
    return this.http
      .post<string>(`${this.baseUrl}/loginAdmin`, body, { responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError('loginAdmin')));
  }


  /**
   * Fetch admin by ID
   * @param adminId - Admin ID
   * @returns Observable<Admin>
   */
  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/get/${adminId}`).pipe(
      catchError(this.handleError('getAdminById'))
    );
  }


  // Error handling helper
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation}: ${error.message || 'unknown error'}`));
    };
  }

  setAdminName(name: string): void {
    this.adminNameSubject.next(name);
  }

  // Get the admin's username
  getAdminName() {
    return this.adminNameSubject.asObservable(); // Returns an observable
  }
}
