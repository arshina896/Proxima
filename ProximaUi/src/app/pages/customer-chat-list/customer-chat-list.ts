import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-chat-list',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-chat-list.html',
  styleUrl: './customer-chat-list.css',
})
export class CustomerChatList implements OnInit {

  chats: any[] = [];

  constructor(
    private chatService: ChatService,
    private router: Router, private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadChats();

  }

  loadChats() {

    this.chatService
      .getChatList()
      .subscribe({

        next: (res: any) => {

          console.log("CHAT LIST =", res);

          this.chats = res;
  this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  openChat(chat: any) {

    this.router.navigate(
      ['/customer-chat'],
      {
        state: {
          booking: chat
        }
      }
    );

  }
}
