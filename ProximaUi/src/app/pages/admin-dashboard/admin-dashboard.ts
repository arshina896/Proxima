import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {
  pendingProviders: any[] = [];
  loading = false;
  categories: any[] = [];
  newCategory = "";
  editMode = false;
  searchUser = '';
  searchService = '';
  searchBooking = '';
  editCategoryId: number | null = null;
  stats: any = {
    totalUsers: 0,
    totalProviders: 0,
    totalServices: 0,
    totalCategories: 0
  };
  users: any[] = [];
  services: any[] = [];
  bookings: any[] = [];

  constructor(private adminService: AdminService, private router: Router, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getPendingProviders();
    this.getCategories();

    this.loadStats();
    this.loadUsers();
    this.loadServices();
    this.loadBookings();
    setTimeout(() => {
      this.cdr.detectChanges();
    });

  }

  getPendingProviders() {
    this.loading = true;

    this.adminService.getPendingProviders().subscribe({
      next: (res: any) => {
        this.pendingProviders = res;

        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }


  approve(id: number) {
    this.adminService.approveProvider(id).subscribe(() => {
      alert("Approved successfully");
      this.getPendingProviders();
    });
  }


  createCategory() {
    if (!this.newCategory) {
      alert("Enter category name");
      return;
    }
    this.adminService.createCategory({ categoryName: this.newCategory })
      .subscribe({
        next: () => {
          alert("Category created");
          this.newCategory = "";
          this.getCategories();
        },
        error: (err) => {
          if (err.status !== 400) {
            console.error(err);
          }
        }
      }
      );
  }

  getCategories() {
    this.adminService.getCategories().subscribe({
      next: (res: any) => {
        console.log("CATEGORIES:", res);

        this.categories = res;

        setTimeout(() => {
          this.cdr.detectChanges();
        });

      },
      error: (err) => {
        console.log("CATEGORY ERROR:", err);
      }
    });
  }

  startEdit(category: any) {
    this.newCategory = category.categoryName;
    this.editMode = true;
    this.editCategoryId = category.id;
  }
  saveCategory() {
    if (!this.newCategory) {
      alert("Enter category name");

      return;
    }
    this.adminService.updateCategory(this.editCategoryId!, {
      categoryName: this.newCategory
    }).subscribe({
      next: () => {
        alert("Update successfully");
        this.resetForm();
        this.getCategories();
      },
      error: (err) => {
        alert(err.error);

      }
    });
  }


  deleteCategory(id: number) {
    if (!confirm("Are you sure?")) return;

    this.adminService.deleteCategory(id).subscribe({
      next: () => {
        alert("Deleted successfully");
        this.getCategories();
      },
      error: (err) => {

        if (err.status === 200) {
          alert("Deleted successfully");
          this.getCategories();
        }
      }
    });
  }
  resetForm() {
    this.newCategory = "";
    this.editMode = false;
    this.editCategoryId = null;
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        console.log("STATS:", res);

        this.stats = res;

        this.cdr.detectChanges();
      }
    });
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        console.log("USERS:", res);

        this.users = [...res];

        this.cdr.detectChanges();
      }
    });
  }
  get filteredUsers() {

    return this.users.filter(u =>

      u.fullName.toLowerCase().includes(this.searchUser.toLowerCase()) ||

      u.email.toLowerCase().includes(this.searchUser.toLowerCase())

    );

  }
  loadServices() {
    this.adminService.getServices().subscribe({
      next: (res: any) => {
        console.log("SERVICES:", res);

        this.services = [...res];

        this.cdr.detectChanges();
      }
    });
  }
  get filteredServices() {
    return this.services.filter(s =>
      s.serviceName.toLowerCase().includes(this.searchService.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchService.toLowerCase())
    );
  }
  loadBookings() {
    this.adminService.getBookings().subscribe({
      next: (res: any) => {
        console.log("BOOKINGS:", res);

        this.bookings = [...res];

        this.cdr.detectChanges();
      }
    });
  }
  deleteUser(id: number) {
    console.log("DELETE CLICKED", id);
    if (!confirm("Delete this user?"))
      return;
    this.adminService.deleteUser(id).subscribe({
      next: (res) => {
        console.log("SUCCESS", res);
        this.users = this.users.filter(u => u.id !== id);
        this.users = [...this.users];
        this.loadUsers();
        this.loadStats();
      },
      error: (err) => {
        console.log("DELETE ERROR", err);
      }
    });
  }
  deleteService(id: number) {
    if (!confirm("Delete this service?"))
      return;
    this.adminService.deleteService(id).subscribe({
      next: (res) => {
        console.log("SUCCESS", res);
        this.services = this.services.filter(s => s.id !== id);
        this.services = [...this.services];
        this.loadStats();
        this.loadServices();
      },
      error: (err) => {

        console.log("DELETE ERROR", err);

        if (err.status === 200) {

          this.services = this.services.filter(s => s.id !== id);
          this.services = [...this.services];

          this.loadStats();

          alert("Deleted Successfully");
        }
      }
    });
  }
  deleteBooking(id: number) {

    if (!confirm("Delete this booking?"))
      return;

    this.adminService.deleteBooking(id).subscribe({
      next: () => {
        alert("Booking deleted");
        this.loadBookings();

        this.loadStats();

      },
      error: (err) => {
        console.log(err);
      }

    });

  }
  get filteredBookings() {
    return this.bookings.filter(b =>
      b.customer.toLowerCase().includes(this.searchBooking.toLowerCase()) ||
      b.service.toLowerCase().includes(this.searchBooking.toLowerCase()) ||
      b.provider.toLowerCase().includes(this.searchBooking.toLowerCase())
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
