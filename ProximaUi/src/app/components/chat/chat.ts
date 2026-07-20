// import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
// import { ChatService } from '../../services/chat.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chat.html',
//   styleUrl: './chat.css',
// })
// export class Chat implements OnInit {
//   @Input() bookingId!: number;

//   @Input() receiverId!: number;

//   messages: any[] = [];

//   message = "";

//   currentUserId =
//     Number(localStorage.getItem("userId"));

//   constructor(
//     private chatService: ChatService, private cdr: ChangeDetectorRef
//   ) { }

//   ngOnInit(): void {
//     console.log("BookingId =", this.bookingId);
//     console.log("ReceiverId =", this.receiverId);
//     this.chatService.startConnection()
//   .then(() => {

//     if (this.bookingId) {

//       this.chatService.joinChat(this.bookingId);

//     } else {

//       console.log("BookingId is undefined");

//     }

//   });

//     this.loadMessages();

//     this.chatService.receiveMessage((msg: any) => {

//       this.messages.push(msg);
//       this.cdr.detectChanges();
//       this.scrollBottom();

//     });

//   }

//   // ===========================
//   // LOAD OLD MESSAGES
//   // ===========================

//   loadMessages() {

//     this.chatService
//       // .getMessages(this.bookingId)
//       .getMessages(this.receiverId)

//       .subscribe({

//         next: (res: any) => {

//           this.messages = res;

//           this.cdr.detectChanges();
//           this.scrollBottom();
//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }

//   // ===========================
//   // SEND MESSAGE
//   // ===========================

//   send() {
//     console.log("BookingId =", this.bookingId);
//     console.log("ReceiverId =", this.receiverId);
//     console.log("CurrentUser =", this.currentUserId);
//     if (!this.message.trim())
//       return;

//     const data = {

//       bookingId: this.bookingId,

//       receiverId: this.receiverId,

//       text: this.message

//     };
//     console.log("DATA =", data);

//     this.chatService
//       .sendMessage(data)

//       .subscribe({

//         next: () => {

//           this.message = "";
//           this.cdr.detectChanges();
//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }

//   // ===========================
//   // AUTO SCROLL
//   // ===========================

//   scrollBottom() {

//     setTimeout(() => {

//       const element =
//         document.getElementById("chatBody");

//       if (element) {

//         element.scrollTop =
//           element.scrollHeight;

//       }

//     }, 100);

//   }

//   // ===========================
//   // LEAVE ROOM
//   // ===========================

//   ngOnDestroy(): void {

//     this.chatService.leaveChat(this.bookingId);

//   }


// }


import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnChanges, OnDestroy {

  @Input() bookingId!: number;
  @Input() receiverId!: number;

  messages: any[] = [];
  message = "";

  currentUserId = Number(localStorage.getItem("userId"));

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    this.chatService.startConnection()
      .then(() => {
        console.log("✅ SignalR Connected");
      });

    // this.chatService.receiveMessage((msg: any) => {

    //   this.messages.push(msg);

    //   this.cdr.detectChanges();

    //   this.scrollBottom();

    // });
    this.chatService.receiveMessage((msg: any) => {

  console.log("MESSAGE RECEIVED =", msg);

  this.messages.push(msg);

  this.cdr.detectChanges();

  this.scrollBottom();

});

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (this.bookingId && this.receiverId) {

      console.log("BookingId =", this.bookingId);
      console.log("ReceiverId =", this.receiverId);

      this.chatService.startConnection().then(() => {

        this.chatService.joinChat(this.bookingId);

        this.loadMessages();
        this.cdr.detectChanges();

      });
    }
    else {

      console.log("Waiting for Inputs...");
      console.log("BookingId =", this.bookingId);
      console.log("ReceiverId =", this.receiverId);

    }

  }

  // ===========================
  // LOAD OLD MESSAGES
  // ===========================

  loadMessages() {

    this.chatService
      .getMessages(this.receiverId)
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

    if (!this.message.trim()) return;

    const data = {

      bookingId: this.bookingId,

      receiverId: this.receiverId,

      text: this.message

    };

    console.log("DATA =", data);

    this.chatService.sendMessage(data)
      .subscribe({

        next: () => {

          this.message = "";
          this.loadMessages();
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

      const element = document.getElementById("chatBody");

      if (element) {

        element.scrollTop = element.scrollHeight;

      }

    }, 100);

  }

  // ===========================
  // LEAVE CHAT
  // ===========================

  ngOnDestroy(): void {

    if (this.bookingId) {

      this.chatService.leaveChat(this.bookingId);

    }

  }

}