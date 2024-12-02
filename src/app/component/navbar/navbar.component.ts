import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import * as bootstrap from 'bootstrap';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isNavbarOpen = false;
  userData: any = null;
  isLoggedIn = true;  // Track login status


    navItems = [
      {
        label: 'Home',
        categories: [
          { title: 'About US', items: ['We help you `Prepare` & `Find your Dream Job`'],isOpen: false },
        ]
      },
      {
        label: 'Internships',
        categories: [
          { title: 'By Category', items: ['Engineering', 'Marketing', 'Sales', 'Content Writing', 'Design', 'Media', 'Law'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],isOpen: false },
          { title: 'Work from Home', items: ['Remote Opportunities', 'Flexible Hours', 'Freelance Jobs', 'Full-Time Remote', 'Part-Time Remote'],isOpen: false },
          { title: 'Part-time Internships', items: ['Internship', 'Part-Time Internship', 'Full Time Internship'],isOpen: false },
          { title: 'Browse All Internships', items: ['Internship Opportunities', 'Remote Internships', 'Skill Development', 'Flexible Hours', 'Industry Exposure'],isOpen: false }
        ]
      },
      {
        label: 'Online Traning',
        categories: [
          { title: 'By Skills', items: ['Programing', 'Data Science', 'Digital Markating', 'Business Communication',],isOpen: false },
          { title: 'Placement Preparation', items: ['Placement Preparation','Interview Preparation'],isOpen: false },
          { title: 'Free Cources', items: ['Beginner Cources','Advance Topics','Skills Development','Certification Paths','Practice Exercises'],isOpen: false },
          { title: 'All Cources', items: ['Software Development','Software Testing','Website Development','Business Analyst','Cyber Security','Data Analyst','Data Engineering','Data Science','E-commerce Development','Full Stack Development','Google Cloud','Linux','POwerBI','Python','SAP','UI/UX','AWS Cloud','Azure'],isOpen: false },
        ]
      },
      {
        label: 'Fresher Jobs',
        categories: [
          { title: 'By Industry', items: ['IT', 'Designing', 'Content Writing', 'Sales', 'Operations','Engineering'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Nagpur', 'Hyderabad'],isOpen: false },
          { title: 'Remote Jobs', items: ['Full-Time Remote','Part-Time Remote', 'Hybrid'],isOpen: false },
          { title: 'All Jobs Categories', items: ['Entry Level','Roler','Graduate','Programs','Internships','Trainee','Positions','Apprenticeships'],isOpen: false },
        ]
      },
      {
        label: 'For Employers',
        categories: [
          { title: 'Job Postings', items: ['Full-Time Opportunities','Project Extensions','Part-Time Roles'],isOpen: false },
          // { title: 'Pricing', items: [],isOpen: false },
          // { title: 'Login/Register', items: [],isOpen: false },

        ]
      },
      {
        label: 'Resources',
        categories: [
          { title: 'Blog', items: ['Internship Tips', 'Skilles Development', 'Industry Trends', 'Success Stories'],isOpen: false },
          { title: 'Resume Generator', items: ['Create Resume', 'Edit Resume'],isOpen: false },
          { title: 'Careeer Guide', items: ['Career Advice', 'Guidance Articles'],isOpen: false },
          { title: 'Interview Preparations', items: ['Tips','Mock Interviews'],isOpen: false },
        ]
      },
      {
        label: 'Help',
        categories: [
          { title: 'FAQs', items: ['Frequently Asked Questions'],isOpen: false },
          { title: 'Contact Us', items: ['Email', 'Telecom Number'],isOpen: false },
          // { title: 'T&S', items: [],isOpen: false },
          // { title: 'Privacy Policy', items: [],isOpen: false  },
        ]
      },
    ];


    constructor(private router: Router, private userservice: UserService) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.userservice.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap dropdowns if needed
    const dropdownElement = document.getElementById('navbarDropdown');
    if (dropdownElement) {
      new bootstrap.Dropdown(dropdownElement);
    }
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  // toggleCategory(category: any) {
  //   category.isOpen = !category.isOpen;
  // }


  loginUser(userName: string, password: string): void {
    // Call the login method from the UserService
    this.userservice.loginUser(userName, password).subscribe(response => {
      if (response === 'Login successful.') {
        this.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    this.userservice.logout();
    this.router.navigate(['/']);
  }
}
