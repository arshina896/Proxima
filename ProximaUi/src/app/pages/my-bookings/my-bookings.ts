

import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  rating = 5;
  comment = '';
  bookings: any[] = [];

  constructor(
    private api: ApiService, private cdr: ChangeDetectorRef, private router: Router
  ) { }

  ngOnInit() {

    this.loadBookings();
    this.cdr.detectChanges();
  }

  loadBookings() {

    this.api
      .getMyBooking()

      .subscribe({

        next: (res: any) => {

          console.log("BOOKINGS=", res);
          console.log("FIRST BOOKING =", res[0]);
          this.bookings = [...res];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

          this.bookings = [];

          this.cdr.detectChanges();

        }

      });

  }


  submitReview(bookingId: number) {

    if (!this.comment) {

      alert("Write comment");

      return;

    }

    const data = {

      bookingId,

      rating: this.rating,

      comment: this.comment

    };

    this.api.addReview(data)

      .subscribe({

        next: () => {

          alert("Review Added ✅");

          this.rating = 5;

          this.comment = '';

        },

        error: (err) => {

          console.log(err);

          alert(err.error);

        }

      });

  }
  cancelBooking(id: number) {

    const ok = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!ok) {
      return;
    }

    this.api
      .cancelBooking(id)
      .subscribe({

        next: (res: any) => {

          alert("Booking Cancelled ✅");

          this.loadBookings();
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

          alert(
            err.error?.message ||
            err.error ||
            "Cancel failed"
          );

        }

      });

  }
  openChat(booking: any) {

    console.log("OPEN CHAT =", booking);

    this.router.navigate(
      ['/customer-chat'],
      {
        state: {
          booking: booking
        }
      }
    );

  }
}

