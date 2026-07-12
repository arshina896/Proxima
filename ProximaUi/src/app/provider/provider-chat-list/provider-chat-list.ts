import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-chat-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-chat-list.html',
  styleUrl: './provider-chat-list.css',
})
export class ProviderChatList implements OnInit {

  chats: any[] = [];
search = '';
  constructor(
    private chatService: ChatService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadChats();
 this.cdr.detectChanges();
  }

  loadChats() {

    this.chatService.getChatList().subscribe({

      next: (res: any) => {

        console.log("PROVIDER CHAT LIST =", res);

        this.chats = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

openChat(chat: any) {

  console.log("Selected Chat =", chat);

  this.router.navigate(
    ['/provider-chat'],
    {
      state: {
        booking: chat
      }
    }
  );

}
get filteredChats() {

  return this.chats.filter(chat =>

    chat.name
      .toLowerCase()
      .includes(this.search.toLowerCase())

  );

}
}
