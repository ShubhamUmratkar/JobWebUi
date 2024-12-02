// internship.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private apiUrl = 'http://localhost:8080/api/internships'; // Adjust base URL if different

  constructor(private http: HttpClient) {}

  createInternship(internship: any, adminId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/createInternship/${adminId}`, internship);
  }

  getAllInternships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllInternships`);
  }

  getInternshipById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getInternshipById/${id}`);
  }

  updateInternship(id: number, internship: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateInternship/${id}`, internship);
  }

  deleteInternship(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteInternship/${id}`);
  }

  getInternshipsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getInternshipsByStatus/${status}`);
  }

  getInternshipsByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getInternshipsByAdmin/${adminId}`);
  }
}
