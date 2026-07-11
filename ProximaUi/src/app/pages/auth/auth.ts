import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  // Toggle
  isRegister = false;

  // Register
  fullname = '';
  confirmPassword = '';

  // Common
  email = '';
  password = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  // ------------------------
  // Toggle Form
  // ------------------------
  toggleForm() {
    this.isRegister = !this.isRegister;

    this.fullname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // ------------------------
  // LOGIN
  // ------------------------
  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (res: any) => {

  // Save Token
  localStorage.setItem("token", res.token);

  const token = res.token;

  // Decode JWT
  const payload = JSON.parse(
    atob(token.split('.')[1])
  );

  // Read UserId
  const userId =
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  // Read Role
  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  // Save to localStorage
  localStorage.setItem("userId", userId);
  localStorage.setItem("role", role);

  console.log("UserId =", userId);
  console.log("Role =", role);
  console.log("Stored UserId =", localStorage.getItem("userId"));

  if (role === "Admin") {

    this.router.navigate(['/admin']);

  }
  else if (role === "ServiceProvider") {

    this.router.navigate(['/provider']);

  }
  else {

    this.router.navigate(['/home']);

  }

},
      // next: (res: any) => {

      //   localStorage.setItem("token", res.token);

      //   const token = res.token;

      //   const payload = JSON.parse(
      //     atob(token.split('.')[1])
      //   );

      //   const role =
      //     payload.role ||
      //     payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      //   if (role === "Admin") {

      //     this.router.navigate(['/admin']);

      //   }
      //   else if (role === "ServiceProvider") {

      //     this.router.navigate(['/provider']);

      //   }
      //   else {

      //     this.router.navigate(['/home']);

      //   }

      // },

      error: (err) => {

        console.log(err);

        alert("Invalid Email or Password");

      }

    });

  }

  // ------------------------
  // REGISTER
  // ------------------------
  register() {

    if (this.password != this.confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    const data = {

      fullName: this.fullname,

      email: this.email,

      password: this.password,

      confirmPassword: this.confirmPassword

    };

    // this.api.register(data).subscribe({

    //   next: () => {

    //     alert("Registration Successful");

    //     // Auto Login
    //     const loginData = {

    //       email: this.email,

    //       password: this.password

    //     };

    //     this.api.login(loginData).subscribe({

    //       next: (loginRes: any) => {

    //         localStorage.setItem(
    //           "token",
    //           loginRes.token
    //         );

    //         this.router.navigate(['/home']);

    //       }

    //     });

    //   },

    //   error: (err) => {

    //     console.log(err);

    //     alert("Registration Failed");

    //   }

    // });

  }
}
