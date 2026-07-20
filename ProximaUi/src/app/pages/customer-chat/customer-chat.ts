import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../components/chat/chat';

@Component({
  selector: 'app-customer-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, Chat],
  templateUrl: './customer-chat.html',
  styleUrl: './customer-chat.css',
})
export class CustomerChat {
  booking: any;

//   constructor(private router: Router, private cdr: ChangeDetectorRef) {

//     this.booking = history.state.booking;
// console.log("Customer Booking =", this.booking);
//     console.log("CUSTOMER CHAT =", this.booking);

//     if (!this.booking) {

//       this.router.navigate(['/my-bookings']);

//     }

//   }
constructor(private router: Router) {

  this.booking = history.state.booking;

  console.log(this.booking);
}

}
