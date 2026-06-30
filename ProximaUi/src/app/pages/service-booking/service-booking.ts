import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-booking.html',
  styleUrl: './service-booking.css',
})
export class ServiceBooking implements OnInit {
  serviceId = 0;
  serviceDate = '';
  timeSlot = '';
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
  }
  bookNow() {

    const body = {

      serviceId:
        this.serviceId,

      serviceDate:
        this.serviceDate,

      timeSlot:
        this.timeSlot

    };

    this.api
      .createBooking(body)
      .subscribe({

        next: () => {

          alert(
            'Booking Created'
          );

        },

        error: (err) => {

          console.log(err);

          alert(
            'Booking Failed'
          );

        }

      });

  }
}
