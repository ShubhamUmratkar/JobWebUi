import { Component, OnInit } from '@angular/core';
import { PendingPost } from 'src/app/model/pending-post';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  admins: any[] = [];
  selectedAdminForPremium: any = null;
  premiumPrice: number = 0;

  errorMessage: string = ''; // To display errors if any
  loading: boolean = false; // To indicate if the request is loading
  http: any;

  pendingPosts: PendingPost[] = [];


  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadPendingPosts(); // Load pending posts when the component initializes

  }

  loadAdmins(): void {
    this.superAdminService.getAllAdmins().subscribe((admins) => {
      console.log("Admin list after disable action:", admins);
      this.admins = admins;
    });
  }


  approveAdmin(adminId: number): void {
    console.log(adminId,"AdminId in Approve state");
    this.superAdminService.approveAdmin(adminId).subscribe(() => this.loadAdmins());
  }

  disableAdmin(adminId: number): void {
    console.log(adminId, "AdminId in Disable state");
    this.superAdminService.disableAdmin(adminId).subscribe(
      () => this.loadAdmins(),
      (error) => {
        console.error('Error disabling admin:', error);
        // Optionally, display an error message to the user
      }
    );
  }


  // setPremiumPrice(admin: any): void {
  //   this.selectedAdminForPremium = admin;
  //   this.premiumPrice = admin.premiumPrice || 0;
  // }

  // savePremiumPrice(): void {
  //   if (this.selectedAdminForPremium) {
  //     this.superAdminService.setPremiumPrice(this.selectedAdminForPremium.id, this.premiumPrice).subscribe(() => {
  //       this.loadAdmins();
  //       this.selectedAdminForPremium = null;
  //       this.premiumPrice = 0;
  //     });
  //   }
  // }





  // getAdmins(): void {
  //   this.loading = true; // Set loading to true while fetching data
  //   this.errorMessage = ''; // Reset error message

  //   this.http.get<any[]>('http://localhost:8080/api/superAdmin/getAllAdmins')
  //     .pipe(
  //       catchError(error => {
  //         this.loading = false; // Set loading to false after the request completes
  //         console.error('Error fetching admins:', error);
  //         this.errorMessage = 'Failed to load admins. Please try again later.'; // Display error message
  //         return of([]); // Return an empty array in case of error
  //       })
  //     )
  //     .subscribe(data => {
  //       this.loading = false; // Set loading to false after the data is received
  //       if (data.length > 0) {
  //         this.admins = data; // Assign the data to the admins array
  //       } else {
  //         this.errorMessage = 'No admins found.';
  //       }
  //     });
  // }


    // Method to load all pending posts
    loadPendingPosts(): void {
      this.superAdminService.getAllPendingPosts().subscribe({
        next: (posts) => {
          this.pendingPosts = posts;
        },
        error: (err) => {
          console.error('Error loading pending posts:', err);
        },
      });
    }


     // Approve post
   // Approve a pending post
   approvePost(postId: number, isApproved: boolean): void {
    this.superAdminService.approvePost(postId, isApproved).subscribe({
      next: (response) => {
        console.log(response);
        alert("Post Approved SuccessFully");
        this.loadPendingPosts();  // Reload the list after action
      },
      error: (err) => {
        console.error('Error approving post:', err);
      },
    });
  }

  // Disapprove (Reject) a pending post
  disapprovePost(postId: number): void {
    this.superAdminService.disapprovePost(postId).subscribe({
      next: (response) => {
        alert("Post Disapproved SuccessFully");

        console.log(response);
        this.loadPendingPosts();  // Reload the list after action
      },
      error: (err) => {
        console.error('Error disapproving post:', err);
      },
    });
  }
}
