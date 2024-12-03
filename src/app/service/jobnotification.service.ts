import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobnotificationService {
  private newJobSubject = new BehaviorSubject<boolean>(false);
  newJob$ = this.newJobSubject.asObservable();

  constructor() {}

  // Call this method whenever a new job is posted
  notifyNewJob() {
    console.log('New job notification triggered');  
    this.newJobSubject.next(true);

    // Hide the notification after 5 seconds
    setTimeout(() => {
      this.newJobSubject.next(false);
    }, 5000);
  }
}