import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';


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
  constructor(private api: ApiService, private router: Router) { }
  login() {

    const data = {
      email: this.email,
      password: this.password
    };


    this.api.login(data).subscribe({
      next: (res: any) => {
        console.log("Login success", res);
        //token save cheyyan
        localStorage.setItem("token", res.token);
        const token = res.token;
        //decode token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role =payload.role || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        console.log("User Role:", role);
        // role base redirect
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
      error: err => {
        console.log("Login failed", err);
      }
    });
  }

}
