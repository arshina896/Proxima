import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  bookings: any[] = [];
  loading = true;
  rating = 5;
  comment = '';
  selectedProviderId: number | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("MyBookings Loaded ✅");

    this.api.getMyBookin().subscribe({
      next: (res: any) => {
        console.log("API DATA:", res);
        this.bookings = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  cancelBooking(id: number) {
    if (!confirm("Cancel booking?"))
      return;
    this.api.cancelBooking(id)
      .subscribe({
        next: () => {
          alert("Booking cancelled");
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          alert(err.error);
        }
      });
  }
  submitReview(bookingId: number) {

    console.log("BOOKING ID=", bookingId);

    const data = {

      bookingId: bookingId,

      rating: this.rating,

      comment: this.comment

    };

    console.log("SENDING=", data);

    this.api.addReview(data)
      .subscribe({

        next: () => {

          alert("Review Added ✅");

          this.comment = "";

          this.rating = 5;

        },

        error: (err) => {

          console.log(err);

          alert(err.error);

        }

      });

  }
  completeBooking(id: number) {

    this.api
      .completeBooking(id)
      .subscribe({

        next: () => {

          alert(
            "Service Completed ✅"
          );

          this.loadBookings();

        },

        error: (err) => {

          console.log(err);

          alert(
            err.error
          );

        }

      });

  }
loadBookings(){

this.loading = true;

this.api
.getMyBookin()
.subscribe({

next:(res:any)=>{

this.bookings = res;

this.loading = false;

this.cdr.detectChanges();

},

error:(err)=>{

console.log(err);

this.loading = false;

}

});

}

}
