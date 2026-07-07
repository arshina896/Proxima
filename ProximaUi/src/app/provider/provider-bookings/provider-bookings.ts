import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-bookings',
  imports: [CommonModule],
  templateUrl: './provider-bookings.html',
  styleUrl: './provider-bookings.css',
})
export class ProviderBookings implements OnInit {

  bookings: any[] = [];

  constructor(
    private api: ServiceProviderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadBookings();

  }

  // =============================
  // Load Bookings
  // =============================

  loadBookings() {

    this.api.getProviderBookings().subscribe({

      next: (res: any) => {

        console.log("Bookings", res);

        this.bookings = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // =============================
  // Update Status
  // =============================

  updateStatus(id: number, status: string) {

    this.api.updateBookingStatus(id, status.toUpperCase())
      .subscribe({

        next: () => {

          this.loadBookings();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  trackById(index:number,item:any){

    return item.id;

  }
}
