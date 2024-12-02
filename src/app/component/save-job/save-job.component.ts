import { Component } from '@angular/core';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/service/job.service';


@Component({
  selector: 'app-save-job',
  templateUrl: './save-job.component.html',
  styleUrls: ['./save-job.component.css'],
})
export class SaveJobComponent {
  job: Job = {
    id: undefined,
    title: '',
    category: '',
    location: '',
    employmentType: '',
    workModel: '',
    experience: '',
    salary: 0.0,
    status: '',
    adminId: 0,
    created_at: new Date().toISOString().slice(0, 16),
    updated_at: new Date().toISOString().slice(0, 16),
    jobDescription: '',
    skills: '',
    company: '',
    openingStartDate: '',
    lastApplyDate: '',
    numberOfOpenings: 0,
    perks: '',
    companyDescription: '',
  };

  jobs: Job[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
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

    const adminId = this.job.adminId ?? 0;

    if (adminId === 0) {
      alert('Admin ID is required!');
      return;
    }

    this.jobService.saveJob(adminId, this.job).subscribe({
      next: (response) => {
        this.successMessage = 'Job saved successfully!';
        alert("Job Added Successfully!");
        this.loadJobs();
        setTimeout(() => this.successMessage = null, 3000); // Hide after 3 seconds
      },
      error: (error) => {
        console.error('Error saving job:', error);
        this.errorMessage = 'Failed to save the job. Check the console for details.';
      },
    });
  }

  updateJob(): void {
    if (!this.job.id) {
      alert('Job ID is missing!');
      return;
    }

    this.jobService.updateJob(this.job.id, this.job).subscribe({
      next: (updatedJob) => {
        this.successMessage = 'Job updated successfully!';
        this.loadJobs();
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

    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.successMessage = 'Job deleted successfully!';
        this.loadJobs();
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
