import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './provider-profile.html',
  styleUrl: './provider-profile.css',
})
export class ProviderProfile implements OnInit {
  provider: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private cdr: ChangeDetectorRef,private router: Router) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.cdr.detectChanges();
    this.api.getProviderProfile(id)
      .subscribe({

        next: (res: any) => {

          console.log(res);

    this.provider = res;

    this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }




  bookService(id: number) {

  this.router.navigate(['/service', id]);

}

}
