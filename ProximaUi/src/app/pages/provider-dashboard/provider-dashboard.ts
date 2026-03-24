import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../api-service';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.css',
})
export class ProviderDashboard implements OnInit {
  bookings: any[] = [];
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadBooking();
  }
  loadBooking() {
    this.api.getProviderBookings().subscribe({
      next: (res: any) => {
        console.log("provider Bookings:", res);
        this.bookings = res;
       this.cdr.detectChanges(); 
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
}
