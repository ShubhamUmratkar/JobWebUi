import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080/api/forms';

  constructor(private http: HttpClient) { }

  // Fetch all forms
  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/getAllForms`);
  }
}