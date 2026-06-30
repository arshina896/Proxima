import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { MyBookings } from '../my-bookings/my-bookings';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-booking.html',
  styleUrl: './service-booking.css',
})
export class ServiceBooking implements OnInit {
  serviceId = 0;
  dates: any[] = [];

  selectedDate: any = null;
  serviceDate = '';

  timeSlot = '';

  note = '';

  service: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService, private cdr: ChangeDetectorRef, private router: Router
  ) { }

  ngOnInit() {

    this.serviceId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.loadService();
    this.generateDates();
  }

  loadService() {

    this.api.getService()
      .subscribe({

        next: (res: any) => {

          console.log("ALL SERVICES", res);

          this.service =
            res.find(
              (x: any) =>
                Number(x.id) === Number(this.serviceId)
            );

          console.log("FOUND", this.service);

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

 bookNow() {

if (!this.serviceDate) {

alert(
"Select date"
);

return;

}

if (!this.timeSlot) {

alert(
"Select time"
);

return;

}

const data = {

serviceId:
this.service.id,

serviceDate:
this.serviceDate,

timeSlot:
this.timeSlot

};

console.log(
"BOOKING DATA",
data
);

this.api
.createBooking(data)

.subscribe({

next:(res:any)=>{

console.log(res);

alert(
"Booking Confirmed ✅"
);

this.router.navigate(
['/my-bookings']
);

},

error:(err)=>{

console.log(
"BOOKING ERROR",
err
);

alert(

err.error?.message
||

err.error
||

"Booking Failed"

);

}

});

}
  generateDates() {

    const today = new Date();

    for (let i = 0; i < 7; i++) {

      const d = new Date();

      d.setDate(
        today.getDate() + i
      );

      this.dates.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        full: d.toISOString().split('T')[0]
      });

    }

  }

  selectDate(d: any) {

    this.selectedDate =
      d.full;

    this.serviceDate =
      d.full;

  }
} 
