import { Component } from '@angular/core';
import { Job } from 'src/app/model/job.model';
import { AdminService } from 'src/app/service/admin.service';
import { JobService } from 'src/app/service/job.service';
import { JobnotificationService } from 'src/app/service/jobnotification.service';


@Component({
  selector: 'app-save-job',
  templateUrl: './save-job.component.html',
  styleUrls: ['./save-job.component.css'],
})
export class SaveJobComponent {
  job: Job = {
    title: '',
    category: '',
    location: '',
    employmentType: '',
    workModel: '',
    experience: '',
    salary: 0.0,
    skills: '',
    company: '',
    jobDescription: '',
    status: 'Active', // Default status
    openingStartDate: '',
    lastApplyDate: '',
    numberOfOpenings: 0,
    perks: '',
    companyDescription: '',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  adminId: number | null = null; // Initially null

  jobs: Job[] = [];

  constructor(
    private jobService: JobService, 
    private jobNotificationService: JobnotificationService, 
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    // Retrieve adminId from localStorage after login
    const storedAdminId = localStorage.getItem('adminId');

    if (storedAdminId) {
      this.adminId = parseInt(storedAdminId, 10); // Convert to number
    }

    if (this.adminId !== null) {
      this.loadJobs(this.adminId);
    } else {
      // Handle case where adminId is not available, e.g., redirect to login page
      this.errorMessage = 'You must be logged in to manage jobs.';
      // Optionally redirect to the login page
      // this.router.navigate(['/login']);
    }
  }

  loadJobs(adminId: number): void {
    if (adminId === null) {
      this.errorMessage = 'Admin ID is missing!';
      return;
    }

    this.jobService.getJobsByAdmin(adminId).subscribe({
      next: (response) => {
        this.jobs = response;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.errorMessage = 'Failed to load jobs. Please try again later.';
      },
    });
  }

  saveJob(jobForm: any): void {
    if (!jobForm.valid) {
      alert('Please fill out all required fields!');
      return;
    }

    if (this.adminId === null) {
      alert('Admin not logged in!');
      return;
    }

    // Post job data to backend using JobService
    this.adminService.postJob(this.adminId, this.job).subscribe({
      next: (response) => {
        this.successMessage = 'Job posted successfully!';
        console.log('Job posted:', response);
        alert('Job posted successfully!');
      },
      error: (error) => {
        console.error('Error posting job:', error);
        this.errorMessage = 'Failed to post the job. Please try again later.';
      },
    });
  }

  updateJob(): void {
    if (!this.job.id) {
      alert('Job ID is missing!');
      return;
    }

    if (this.adminId === null) {
      alert('Admin not logged in!');
      return;
    }

    this.jobService.updateJob(this.job.id, this.job).subscribe({
      next: (updatedJob) => {
        this.successMessage = 'Job updated successfully!';
        alert("Job Updated Successfully!");
        // this.loadJobs(this.adminId);
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (error) => {
        console.error('Error updating job:', error);
        this.errorMessage = 'Failed to update the job.';
      },
    });
  }

  deleteJob(id: number | undefined): void {
    if (id === undefined) {
      alert('Job ID is missing!');
      return;
    }

    if (this.adminId === null) {
      alert('Admin not logged in!');
      return;
    }

    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.successMessage = 'Job deleted successfully!';
        // this.loadJobs(this.adminId);
        setTimeout(() => {
          this.successMessage = null;
          window.location.reload(); // Reload the page after success message disappears
        }, 3000); // Reload after 3 seconds
      },
      error: (error) => {
        console.error('Error deleting job:', error);
        this.errorMessage = 'Failed to delete the job. Please try again later.';
      },
    });
  }

  editJob(job: Job): void {
    this.job = { ...job }; // Populate the form with job data for editing
  }
}