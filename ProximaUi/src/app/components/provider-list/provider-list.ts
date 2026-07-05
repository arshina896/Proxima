import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
})
export class ProviderList implements OnInit{
  providers: any[] = [];

  constructor(private api: ApiService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders() {

    this.api.getAllProviders()
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

}
