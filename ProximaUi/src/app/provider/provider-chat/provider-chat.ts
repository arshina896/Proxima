import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../components/chat/chat';

@Component({
  selector: 'app-provider-chat',
  imports: [CommonModule,Chat],
  templateUrl: './provider-chat.html',
  styleUrl: './provider-chat.css',
})
export class ProviderChat {
  booking: any;

  constructor(private router: Router) {

    this.booking = history.state.booking;

    console.log("PROVIDER CHAT =", this.booking);

    if (!this.booking) {
      this.router.navigate(['/provider-dashboard']);
    }

  }
}
