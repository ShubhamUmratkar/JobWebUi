import { Component } from '@angular/core';
import { JobnotificationService } from 'src/app/service/jobnotification.service';

@Component({
  selector: 'app-jobnotification',
  templateUrl: './jobnotification.component.html',
  styleUrls: ['./jobnotification.component.css']
})
export class JobnotificationComponent {
  showNotification: boolean = false;

  constructor(private jobNotificationService: JobnotificationService) {}

  ngOnInit(): void {
    this.jobNotificationService.newJob$.subscribe((newJobPosted) => {
      this.showNotification = newJobPosted;
      console.log('Notification status changed:', newJobPosted);  // Check if subscription works
    });
  }
}