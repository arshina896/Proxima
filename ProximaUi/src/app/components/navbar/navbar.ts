import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Navbar {
  notifications: any[] = [];
  constructor(private api: ApiService,private cdr:ChangeDetectorRef) { }
  ngOnInit() {
    this.loadNotifications();
    // this.cdr.detectChanges();
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
this.cdr.detectChanges();
      });

  }
}
