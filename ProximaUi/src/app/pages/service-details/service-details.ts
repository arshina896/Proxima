import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css',
})
export class ServiceDetails implements OnInit {
  service: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router:
      Router
  ) { }

  ngOnInit() {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    console.log("ID=", id);

    this.api
      .getService()
      .subscribe({

        next: (res: any) => {

          console.log("ALL SERVICES", res);

          const found =
            res.find(
              (x: any) =>
                x.id === id
            );

          console.log("FOUND", found);

          this.service = found;

          // ✅ ഇവിടെ add ചെയ്യണം
          this.cdr.detectChanges();

        },

        error: (err) => {
          console.log(err);
        }

      });

  }
  bookService(
    id: number
  ) {

    this.router.navigate(
      [
        '/service-booking',
        id
      ]
    );

  }

  routeToBooking(
    id: number
  ) {

    this.api;

    this.cdr;

    window.location.href =
      '/service-booking/' + id;

  }
}
