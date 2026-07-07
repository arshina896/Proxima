import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-reviews',
  imports: [CommonModule],
  templateUrl: './provider-reviews.html',
  styleUrl: './provider-reviews.css',
})
export class ProviderReviews 
implements OnInit {

  reviewData: any;

  constructor(
    private api: ServiceProviderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadReviews();

  }

  // ==========================
  // Load Reviews
  // ==========================

  loadReviews() {

    this.api.getReviews().subscribe({

      next: (res: any) => {

        console.log("Reviews :", res);

        this.reviewData = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log("Review Error :", err);

      }

    });
  }
}
