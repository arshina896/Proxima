import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api-service';
import { error } from 'node:console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  constructor(private api: ApiService) { }
  login() {
    this.api.login(this.email, this.password).subscribe({
      next: res => {
        console.log("Login success", res);
      },
      error: err => {
        console.log("Login failed", err);
      }
    })
  }

}
