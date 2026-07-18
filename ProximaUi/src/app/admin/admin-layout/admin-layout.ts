import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { AdminUsers } from '../admin-users/admin-users';
import { AdminProviders } from '../admin-providers/admin-providers';
// import { AdminService } from '../../services/admin-service';
import { AdminBookings } from '../admin-bookings/admin-bookings';
import { AdminCategories } from '../admin-categories/admin-categories';
import { AdminServices } from '../admin-services/admin-services';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,  RouterModule, AdminDashboard, AdminUsers, AdminProviders,AdminServices, AdminBookings, AdminCategories],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  constructor(private router: Router) {}
sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

closeSidebar() {
  this.sidebarOpen = false;
}

scrollTo(section: string) {
  const element = document.getElementById(section);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
