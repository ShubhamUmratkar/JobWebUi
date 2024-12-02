import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../model/job.model';


@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/getJobById/${id}`);
  }


  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/getAllJobs`);
  }


  saveJob(adminId: number, job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/saveJob/${adminId}`, job);
  }

  searchJobs(searchParams: any): Observable<Job[]> {
    let params = new HttpParams();

    // Dynamically add non-empty search parameters to HttpParams
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
        params = params.append(key, searchParams[key]);
      }
    });

    return this.http.get<Job[]>(`${this.apiUrl}/searchJobs`, { params });
  }

  // Other method examples for any other API requests if required (e.g., delete job, etc.)
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteJob/${jobId}`);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/updateJob/${id}`, job);
  }
   getJobsByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getJobsByAdmin/${adminId}`);
  }

  getInternshipsByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getInternshipsByAdmin/${adminId}`);
  }
}
