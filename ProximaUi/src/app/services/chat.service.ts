import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection!: signalR.HubConnection;

  // Current joined booking
  private currentBookingId = 0;

  constructor(private http: HttpClient) { }

  // ============================
  // SignalR Connection
  // ============================

  startConnection(): Promise<void> {

    if (
      this.hubConnection &&
      this.hubConnection.state === signalR.HubConnectionState.Connected
    ) {
      return Promise.resolve();
    }

    this.hubConnection = new signalR.HubConnectionBuilder()

      .withUrl(
        environments.apiUrl.replace('/api', '') + "/chatHub",
        {
          accessTokenFactory: () =>
            localStorage.getItem("token") || ""
        }
      )

      .withAutomaticReconnect()

      .build();

    // വീണ്ടും connect ആയാൽ പഴയ room join ചെയ്യും
    this.hubConnection.onreconnected(() => {

      console.log("✅ Reconnected");

      if (this.currentBookingId > 0) {

        this.joinChat(this.currentBookingId);

      }

    });

    return this.hubConnection.start()
      .then(() => {

        console.log("✅ SignalR Connected");

      })
      .catch(err => {

        console.log(err);

        throw err;

      });

  }

  // ============================
  // Join Chat
  // ============================

 joinChat(bookingId: number) {

  if (!this.hubConnection) {
    console.log("Hub not created");
    return Promise.resolve();
  }

  if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
    console.log("Hub not connected");
    return Promise.resolve();
  }

  this.currentBookingId = bookingId;

  return this.hubConnection.invoke(
    "JoinChat",
    bookingId.toString()
  );

}

  // ============================
  // Leave Chat
  // ============================

  // leaveChat(bookingId: number) {

  //   this.currentBookingId = 0;

  //   return this.hubConnection.invoke(
  //     "LeaveChat",
  //     bookingId.toString()
  //   );

  // }
  leaveChat(bookingId: number) {

  this.currentBookingId = 0;

  if (
    !this.hubConnection ||
    this.hubConnection.state !== signalR.HubConnectionState.Connected
  ) {
    return Promise.resolve();
  }

  return this.hubConnection.invoke(
    "LeaveChat",
    bookingId.toString()
  );

}

  // ============================
  // Receive Message
  // ============================

  receiveMessage(callback: any) {

    // duplicate listener ഒഴിവാക്കാൻ
    this.hubConnection.off("ReceiveMessage");

    this.hubConnection.on(
      "ReceiveMessage",
      callback
    );

  }

  // ============================
  // Send Message
  // ============================

  sendMessage(data: any) {

    return this.http.post(
      environments.apiUrl + "/chat/send",
      data
    );

  }

  // ============================
  // Get Conversation
  // ============================

  // getMessages(bookingId: number) {

  //   return this.http.get(
  //     environments.apiUrl + "/chat/" + bookingId
  //   );

  // }
  getMessages(userId: number) {

  return this.http.get(
    environments.apiUrl + "/chat/conversation/" + userId
  );

}
getChatList() {

  return this.http.get(

    environments.apiUrl + "/chat/list"

  );

}

getProviderChatList() {

  return this.http.get(

    environments.providerUrl + "/provider-list"

  );

}
}