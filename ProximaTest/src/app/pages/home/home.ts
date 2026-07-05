// import { CommonModule } from '@angular/common';
// import { Component,OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { Navbar } from '../../components/navbar/navbar';
// import { Hero } from '../../components/hero/hero';
// import { ProviderList } from '../../components/provider-list/provider-list';
// import { ApiService } from '../../services/api-service';

// @Component({
//   selector: 'app-home',
//   imports: [ RouterModule,
//     CommonModule,
//     FormsModule,
//     Navbar,
//     Hero,],
//   templateUrl: './home.html',
//   styleUrl: './home.css',
// })
// export class Home 
// implements OnInit {

//   providers: any[] = [];
//   categories: any[] = [];
//   notifications: any[] = [];

//   search = '';
//   categoryId = 0;
//   sort = '';

//   constructor(private router: Router, private api: ApiService) { }

//   ngOnInit() {

//     this.loadProviders();

//     this.loadCategories();

//     this.loadNotifications();

//   }


//   loadProviders() {

//     this.api
//       .getProvider()
//       .subscribe({

//         next: (res: any) => {

//           this.providers =
//             res || [];



//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }


//   loadCategories() {

//     this.api
//       .getCategories()
//       .subscribe({

//         next: (res: any) => {

//           this.categories =
//             res || [];



//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }

//   loadNotifications() {

//     this.api
//       .getNotifications()
//       .subscribe({

//         next: (res: any) => {

//           this.notifications =
//             res || [];



//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }

//   searchService() {

//     const data = {

//       keyword: this.search,

//       categoryId: Number(this.categoryId),

//       sort: this.sort

//     };

//     this.api.searchServices(data)
//       .subscribe({

//         next: (res: any) => {

//           this.providers = res || [];

//         },

//         error: (err) => {

//           console.log(err);

//         }

//       });

//   }

//   bookingService(
//     service: any,
//     serviceDate: string,
//     timeSlot: string
//   ) {

//     if (!serviceDate) {

//       alert('Select date');

//       return;

//     }

//     if (!timeSlot) {

//       alert('Select time');

//       return;

//     }

//     const data = {

//       serviceId: service.id,

//       serviceDate,

//       timeSlot

//     };

//     this.api.bookingService(data)
//       .subscribe({

//         next: () => {

//           alert("Booked Successfully ✅");

//         },

//         error: (err) => {

//           console.log(err);

//           alert(
//             err.error.message
//             ||
//             err.error
//           );

//         }

//       });

//   }

//   resetFilter() {

//     this.search = '';

//     this.categoryId = 0;

//     this.sort = '';

//     this.loadProviders();

//   }

//   logout() {

//     localStorage.removeItem("token");

//     this.router.navigate(
//       ['/login']
//     );

//   }
// }
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { ProviderList } from '../../components/provider-list/provider-list';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-home',
  imports: [ RouterModule,
    CommonModule,
    FormsModule,
    Navbar,
    Hero,],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home 
implements OnInit {
 providers: any[] = [];
  categories: any[] = [];
  notifications: any[] = [];

  search = '';
  categoryId = 0;
  sort = '';

  constructor(private router: Router, private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.loadProviders();

    this.loadCategories();

    this.loadNotifications();

  }


  loadProviders() {

    this.api
      .getProvider()
      .subscribe({

        next: (res: any) => {

          this.providers =
            res || [];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  loadCategories() {

    this.api
      .getCategories()
      .subscribe({

        next: (res: any) => {

          this.categories =
            res || [];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadNotifications() {

    this.api
      .getNotifications()
      .subscribe({

        next: (res: any) => {

          this.notifications =
            res || [];

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

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

          this.providers = res || [];

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  bookingService(
    service: any,
    serviceDate: string,
    timeSlot: string
  ) {

    if (!serviceDate) {

      alert('Select date');

      return;

    }

    if (!timeSlot) {

      alert('Select time');

      return;

    }

    const data = {

      serviceId: service.id,

      serviceDate,

      timeSlot

    };

    this.api.bookingService(data)
      .subscribe({

        next: () => {

          alert("Booked Successfully ✅");

        },

        error: (err) => {

          console.log(err);

          alert(
            err.error.message
            ||
            err.error
          );

        }

      });

  }

  resetFilter() {

    this.search = '';

    this.categoryId = 0;

    this.sort = '';

    this.loadProviders();

  }

  logout() {

    localStorage.removeItem("token");

    this.router.navigate(
      ['/login']
    );

  }
}
