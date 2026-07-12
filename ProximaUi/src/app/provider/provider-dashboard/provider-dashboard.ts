import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProviderServices } from '../provider-services/provider-services';
import { ProviderBookings } from '../provider-bookings/provider-bookings';
import { ProviderReviews } from '../provider-reviews/provider-reviews';
import { Profile } from '../../pages/profile/profile';
import { Chat } from '../../components/chat/chat';
@Component({
  selector: 'app-provider-dashboard',
   standalone: true,
  imports: [CommonModule, ProviderServices, ProviderBookings, RouterModule,
    ProviderReviews,
    Profile,Chat
  ],
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.css',
})
export class ProviderDashboard implements OnInit {
  stats: any = {

    totalServices: 0,

    totalBookings: 0,

    pendingBookings: 0,

    approvedBookings: 0,

    completedBookings: 0,

    rejectedBookings: 0
  };
selectedBookingId: number | null = null;

selectedReceiverId: number | null = null;

showChat = false;
  notifications: any[] = [];

  showNotifications = false;
  // activePage = 'dashboard';
  constructor(private api: ServiceProviderService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {

    this.loadStats();
    this.loadNotifications();
    this.cdr.detectChanges();
      this.api.refreshStats.subscribe(() => {

    this.loadStats();

  });
  }
  scrollTo(section: string) {

    const element = document.getElementById(section);

    if (element) {

      element.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

    }

  }

  loadStats() {

    this.api.getProviderStats().subscribe({

      next: (res: any) => {

        console.log("Provider Stats:", res);

        this.stats = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
  loadNotifications() {

    this.api.getNotifications().subscribe({

      next: (res: any) => {

        console.log("Notifications:", res);

        this.notifications = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
  toggleNotifications() {

    this.showNotifications = !this.showNotifications;

  }

  markAsRead(notification: any) {

    if (notification.isRead) return;

    this.api.markNotificationRead(notification.id)
      .subscribe({

        next: () => {

          notification.isRead = true;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  get unreadCount(): number {

    return this.notifications.filter(n => !n.isRead).length;

  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  openChat(booking: any) {

  this.selectedBookingId = booking.id;

  this.selectedReceiverId = booking.userId;

  this.showChat = true;

}

closeChat() {

  this.showChat = false;

}

sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;

}

closeSidebar() {
  this.sidebarOpen = false;
}

}