import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
notifications: any[] = [];
    profile: any = {};
      profileImage = '';
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.loadNotifications();
    this.loadProfile();
  }
  logout() {

    localStorage.clear();

    window.location.href = '/login';

  }
  loadNotifications() {

    this.api
      .getNotifications()
      .subscribe((res: any) => {

        this.notifications = res;
      });

  }
  loadProfile() {

    this.api.getProfile().subscribe({

      next: (res: any) => {

        this.profile = res;

        if (res.profileImage) {

          this.profileImage =
            "https://localhost:7040/" +
            res.profileImage;

        }


      },

      error: err => {

        console.log(err);

      }

    });

  }
}
