import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chat } from '../../components/chat/chat';
@Component({
  selector: 'app-provider-chat',
  standalone: true,
  imports: [CommonModule, Chat, RouterModule],
  templateUrl: './provider-chat.html',
  styleUrl: './provider-chat.css',
})
export class ProviderChat {
  booking: any;

  constructor(private router: Router, private location: Location) {
    this.booking = history.state.booking;

    if (!this.booking) {
      this.router.navigate(['/provider-chat-list']);
    }
  }
  goBack() {

  this.location.back();

}
}
