import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {

  stats = {
    totalUsers: 0,
    totalProviders: 0,
    pendingProviders: 0,
    totalServices: 0,
    totalBookings: 0,
    totalCategories: 0
  };

  constructor(private adminService: AdminService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        this.stats = res;
 this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
