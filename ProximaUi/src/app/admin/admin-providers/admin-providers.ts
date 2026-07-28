import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-providers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-providers.html',
  styleUrl: './admin-providers.css'
})
export class AdminProviders implements OnInit {

  providers: any[] = [];
  filteredProviders: any[] = [];
  search = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders() {

    this.adminService.getPendingProviders().subscribe({

      next: (res: any) => {

        this.providers = res;
        this.filteredProviders = res;
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  searchProvider() {

    const value = this.search.toLowerCase();

    this.filteredProviders = this.providers.filter(x =>

      x.fullName.toLowerCase().includes(value) ||

      x.email.toLowerCase().includes(value)

    );
    this.cdr.detectChanges();
  }

  approve(id: number) {

    if (!confirm('Approve this provider?')) return;

    this.adminService.approveProvider(id).subscribe({

      next: () => {

        alert('Provider Approved Successfully');
        this.loadProviders();
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);

      }

    });

  }
reject(id: number) {

  if (!confirm("Reject this provider?")) return;

  this.adminService.rejectProvider(id).subscribe({

    next: () => {

      alert("Provider Rejected");

      this.loadProviders();

    },

    error: (err) => {

      console.log(err);

    }

  });

}
}