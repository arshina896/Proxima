import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',

})
export class Register {
  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';
  constructor(private api: ApiService, private router: Router) { }
  register() {
    // password check
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const data = {
      fullName: this.fullname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    this.api.register(data).subscribe({
      next: (res) => {
        console.log("redister success");
        //automatic login
        const loginData = {
          email: this.email,
          password: this.password
        }
        this.api.login(loginData).subscribe({
          next: (loginRes: any) => {

            //token save cheyyan
            localStorage.setItem("token", loginRes.token);
            //login cheyth home leek povan
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log("Auto Login fail", err);
          }
        });
      },
      error: (err) => {
        console.log("register failed", err);
      }
    })
  }
}






