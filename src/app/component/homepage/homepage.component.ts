import { Component , OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { JobnotificationService } from 'src/app/service/jobnotification.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  searchText: string = '';  // To bind to the input value
  showNotificationBadge: boolean = false;  // Flag for showing the notification badge

  constructor(private router: Router , private jobNotificationService: JobnotificationService) {}


  ngOnInit() {
    // Subscribe to new job notifications
    this.jobNotificationService.newJob$.subscribe((newJobPosted) => {
      this.showNotificationBadge = newJobPosted;  // Show badge when new job is posted
    });
  }

  // Function to handle bell click
  toggleNotification() {
    this.showNotificationBadge = false;  // Hide badge when bell is clicked (assuming it's a simple toggle)
    // Optionally, you can show the actual notifications or take the user to a page with job details
  }


  // This method is triggered every time the user types something in the input field
  onSearchInput(): void {
    // You can add logic here to process the input or give suggestions if needed.
  }

  // This method is triggered when the user clicks the search button
  searchJobs(): void {
    if (this.searchText.trim()) {
      // Only proceed if searchText is not empty or just spaces
      this.router.navigate(['/job-posts'], { queryParams: { search: this.searchText } });
    }
  }
}