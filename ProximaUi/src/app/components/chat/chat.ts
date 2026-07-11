import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
    standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  @Input() bookingId!: number;

  @Input() receiverId!: number;

  messages: any[] = [];

  message = "";

  currentUserId =
    Number(localStorage.getItem("userId"));

  constructor(
    private chatService: ChatService, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.chatService.startConnection()
      .then(() => {

        this.chatService.joinChat(this.bookingId);

      });

    this.loadMessages();

    this.chatService.receiveMessage((msg: any) => {

      this.messages.push(msg);
 this.cdr.detectChanges();
      this.scrollBottom();
    
    });

  }

  // ===========================
  // LOAD OLD MESSAGES
  // ===========================

  loadMessages() {

    this.chatService
      .getMessages(this.bookingId)

      .subscribe({

        next: (res: any) => {

          this.messages = res;

          this.cdr.detectChanges();
          this.scrollBottom();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ===========================
  // SEND MESSAGE
  // ===========================

  send() {
  console.log("BookingId =", this.bookingId);
  console.log("ReceiverId =", this.receiverId);
  console.log("CurrentUser =", this.currentUserId);
    if (!this.message.trim())
      return;

    const data = {

      bookingId: this.bookingId,

      receiverId: this.receiverId,

      text: this.message

    };
    console.log("DATA =", data);

    this.chatService
      .sendMessage(data)

      .subscribe({

        next: () => {

          this.message = "";
      this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ===========================
  // AUTO SCROLL
  // ===========================

  scrollBottom() {

    setTimeout(() => {

      const element =
        document.getElementById("chatBody");

      if (element) {

        element.scrollTop =
          element.scrollHeight;

      }

    }, 100);

  }

  // ===========================
  // LEAVE ROOM
  // ===========================

  ngOnDestroy(): void {

    this.chatService.leaveChat(this.bookingId);

  }


}
