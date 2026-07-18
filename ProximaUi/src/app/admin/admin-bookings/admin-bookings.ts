import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css'
})
export class AdminBookings implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];

  search = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {

    this.adminService.getBookings().subscribe({

      next: (res: any) => {

        this.bookings = res;
        this.filteredBookings = res;
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  searchBooking() {

    const value = this.search.toLowerCase();

    this.filteredBookings = this.bookings.filter(x =>

      x.customer.toLowerCase().includes(value) ||

      x.provider.toLowerCase().includes(value) ||

      x.service.toLowerCase().includes(value) ||

      x.status.toLowerCase().includes(value)

    );
    this.cdr.detectChanges();

  }
  

  deleteBooking(id: number) {

    if (!confirm('Delete this booking?')) return;

    this.adminService.deleteBooking(id).subscribe({

      next: () => {

        this.loadBookings();
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}