import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  providers: any[] = [];
  constructor(private router: Router, private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.getProvider().subscribe((res: any) => {
      console.log(res);
      this.providers = res;
      this.cdr.detectChanges();
    });
  }

  bookingService(id: number) {
    this.api.bookingService(id).subscribe({
      next: () => {
        alert("Booked successfully ✅");
      },
      error: (err) => {
        console.log(err);
        alert("Booking failed ❌");
      }
    });
  }
  logout() {
    localStorage.removeItem("token");

    this.router.navigate(['/login']);
  }


}
