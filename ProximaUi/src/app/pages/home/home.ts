import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  providers: any[] = [];
  categories: any[] = [];
  search = '';
  categoryId = 0;
  serviceDate = '';
  timeSlot = '';
  sort = '';
  notifications:any[]=[];
  constructor(private router: Router, private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.getProvider().subscribe((res: any) => {
      console.log(res);
      this.providers = res;
      this.loadNotifications();
      this.cdr.detectChanges();
    });
    this.api
      .getCategories()
      .subscribe((res: any) => {

        this.categories = res;

      });
  }

  
  bookingService(
    service: any,
    serviceDate: string,
    timeSlot: string
  ) {

    console.log("DATE=", serviceDate);

    console.log("TIME=", timeSlot);

    if (!serviceDate) {

      alert("Select date");

      return;

    }

    if (!timeSlot) {

      alert("Select time");

      return;

    }

    const data = {

      serviceId: service.id,

      serviceDate: serviceDate,

      timeSlot: timeSlot

    };

    console.log("BOOKING=", data);

    this.api.bookingService(data)
      .subscribe({

        next: () => {

          alert("Booked successfully ✅");

        },

        error: (err) => {

          console.log(err);

      alert(err.error.message || err.error);

        }

      });

  }
  loadNotifications(){

this.api
.getNotifications()

.subscribe({

next:(res:any)=>{

console.log(
res
);

this.notifications=
res;

},

error:(err)=>{

console.log(
err
);

}

});

}
  logout() {
    localStorage.removeItem("token");

    this.router.navigate(['/login']);
  }
  searchService() {

    const data = {

      keyword: this.search,

      categoryId: Number(this.categoryId),

      sort: this.sort

    };

    this.api.searchServices(data)
      .subscribe({

        next: (res: any) => {

          this.providers = res;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  loadProviders() {

    this.api.getProvider()
      .subscribe({

        next: (res: any) => {

          this.providers = res;

          this.cdr.detectChanges();

        }

      });

  }
  resetFilter() {

    this.search = '';

    this.categoryId = 0;

    this.sort = '';

    this.ngOnInit();

  }

}
