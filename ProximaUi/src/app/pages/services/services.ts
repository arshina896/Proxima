import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../api-service';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  services: any[] = [];
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.api.getService().subscribe({

      next: (res: any) => {
        console.log("API DATA:", res);
       
        this.services = res;

        this.cdr.detectChanges();
        console.log("ASSIGNED:", this.services);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  bookingService(id:number){
    this.api.bookingService(id).subscribe({
      next:(res)=>{
        alert("waiting for confrimation");
        console.log(res);

      },
      error:(err)=>{
        console.log(err);
        alert("your booking faild");
      }
    });
  }

}
