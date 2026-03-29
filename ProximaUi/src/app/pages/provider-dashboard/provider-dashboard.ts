import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.css',
})
export class ProviderDashboard implements OnInit {
  bookings: any[] = [];
  categories: any[] = [];
  categoryId: number | null = null;
services: any[] = [];
  serviceName = "";
  price: number | null = null;
  constructor(private api: ServiceProviderService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadBooking();
    this.loadCategories();
      this.getService(); 
  }
  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    });
  }
  loadBooking() {
    this.api.getProviderBookings().subscribe({
      next: (res: any) => {
        console.log("Provider Bookings:", res);
        this.bookings = res;

        setTimeout(() => {
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.log(err)
    });
  }
  updateStatus(id: number, status: string) {
    this.api.updateBookingStatus(id, status).subscribe({
      next: () => {
        alert("Updated");
        this.loadBooking();
      },
      error: (err) => console.log(err)
    });
  }
  // ✅ CREATE SERVICE
  createService() {

    if (!this.serviceName || !this.price || !this.categoryId) {
      alert("Fill all fields");
      return;
    }

    const data = {
      serviceName: this.serviceName,
      price: this.price,
      serviceCategoryId: this.categoryId
    };

    this.api.createService(data).subscribe({
      next: () => {
        alert("Service Created");

        // reset
        this.serviceName = "";
        this.price = null;
        this.categoryId = null;
      },
      error: (err) => console.log(err)
    });
  }
  getService() {
    this.api.getService().subscribe({
      next: (res: any) => {
        console.log("SERVICES:", res);
            this.services = res;
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      }
    })
  }
}