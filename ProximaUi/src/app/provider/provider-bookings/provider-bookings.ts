import { ChangeDetectorRef, Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-bookings',
  imports: [CommonModule],
  templateUrl: './provider-bookings.html',
  styleUrl: './provider-bookings.css',
})
export class ProviderBookings implements OnInit {
// @Output() chatClicked = new EventEmitter<any>();
  bookings: any[] = [];

  constructor(
    private api: ServiceProviderService,
    private cdr: ChangeDetectorRef, private router: Router
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
 this.api.refreshStats.next();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  trackById(index:number,item:any){

    return item.id;

  }
 openChat(booking: any) {

  console.log("OPEN CHAT =", booking);

  this.router.navigate(
    ['/provider-chat'],
    {
      state: {
        booking: booking
      }
    }
  );

}
}
