import { CommonModule } from '@angular/common';
import { Component ,OnInit,ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';



@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  bookings:any[]=[];
  loading=true;
constructor(private api:ApiService,private cdr: ChangeDetectorRef){}

ngOnInit() {
  console.log("MyBookings Loaded ✅");

  this.api.getMyBookin().subscribe({
    next: (res: any) => {
      console.log("API DATA:", res);
      this.bookings = res;
      this.loading = false;
          this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.log(err);
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  });
}

}
