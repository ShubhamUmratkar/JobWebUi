import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from 'src/app/service/super-admin.service 2';
@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css']
})
export class SuperAdminLoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private superAdminService: SuperAdminService, private router: Router) {}

  login(): void {
    this.superAdminService.login(this.credentials).subscribe(
      (response) => {
        if (response.token) {
          // Save token to localStorage or any secure storage
          localStorage.setItem('superAdminToken', response.token);
          this.router.navigate(['/super-admin-dashboard']); // Redirect to dashboard
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }
}
