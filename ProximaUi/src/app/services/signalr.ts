import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
@Injectable({
  providedIn: 'root',
})
export class Signalr {
   private hubConnection!: signalR.HubConnection;

  startConnection() {

    const token = localStorage.getItem("token");

    this.hubConnection = new signalR.HubConnectionBuilder()

      .withUrl("https://localhost:7040/chatHub", {
        accessTokenFactory: () => token || ""
      })

      .withAutomaticReconnect()

      .build();

    this.hubConnection
      .start()

      .then(() => {

        console.log("✅ SignalR Connected");

      })

      .catch(err => {

        console.log("SignalR Error", err);

      });

  }

  joinRoom(bookingId: number) {

    this.hubConnection.invoke(
      "JoinChat",
      bookingId.toString()
    );

  }

  leaveRoom(bookingId: number) {

    this.hubConnection.invoke(
      "LeaveChat",
      bookingId.toString()
    );

  }

  sendMessage(bookingId: number, message: any) {

    this.hubConnection.invoke(
      "SendMessage",
      bookingId.toString(),
      message
    );

  }

  receiveMessage(callback: any) {

    this.hubConnection.on(
      "ReceiveMessage",
      callback
    );

  }
}
