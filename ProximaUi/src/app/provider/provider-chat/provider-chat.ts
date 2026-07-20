// import { CommonModule, Location } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { Chat } from '../../components/chat/chat';
// @Component({
//   selector: 'app-provider-chat',
//   standalone: true,
//   imports: [CommonModule, Chat, RouterModule],
//   templateUrl: './provider-chat.html',
//   styleUrl: './provider-chat.css',
// })
// export class ProviderChat {
//   booking: any;

//   constructor(private router: Router, private location: Location) {
//     this.booking = history.state.booking;
//     console.log("Provider Booking =", this.booking);
//     console.log(this.booking);

//     if (!this.booking) {
//       this.router.navigate(['/provider-chat-list']);
//     }
//   }
//   goBack() {

//     this.location.back();

//   }
// }
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chat } from '../../components/chat/chat';

@Component({
  selector: 'app-provider-chat',
  standalone: true,
  imports: [CommonModule, Chat, RouterModule],
  templateUrl: './provider-chat.html',
  styleUrl: './provider-chat.css',
})
export class ProviderChat implements OnInit {

  booking: any;

  constructor(
    private router: Router,
    private location: Location
  ) {

    this.booking = history.state.booking;

    console.log("Booking =", this.booking);

    console.log("Booking Id =", this.booking.bookingId);

    console.log("Receiver Id =", this.booking.userId);

    if (!this.booking) {

      this.router.navigate(['/provider-chat-list']);

    }

  }

  ngOnInit(): void {

    console.log("Booking =", this.booking);

    console.log("Booking Id =", this.booking?.id);

    console.log("Receiver Id =", this.booking?.userId);

  }

  goBack() {

    this.location.back();

  }

}