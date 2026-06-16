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


  constructor(private router: Router, private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.getProvider().subscribe((res: any) => {
      console.log(res);
      this.providers = res;
      this.cdr.detectChanges();
    });
    this.api
      .getCategories()
      .subscribe((res: any) => {

        this.categories = res;

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
 searchService() {

const data = {

keyword: this.search,

categoryId: Number(this.categoryId)

};

console.log("SEARCH=", data);

this.api
.searchServices(data)
.subscribe({

next:(res:any)=>{

console.log("RESULT=",res);

this.providers=res;

this.cdr.detectChanges();

},

error:(err)=>{

console.log(err);

}

});

}

}
