import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
    standalone: true,
  // template: `<h1>Check console</h1>`,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('ProximaUi');
  constructor(private api: ApiService) {
   
  }
}
