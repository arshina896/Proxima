import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-provider-profile',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './provider-profile.html',
  styleUrl: './provider-profile.css',
})
export class ProviderProfile implements OnInit{
  provider: any;

  constructor( private route: ActivatedRoute,private api: ApiService ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getProviderProfile(id)
      .subscribe({

        next: (res: any) => {

          this.provider = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}
