import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  categories: any[] = [];

  constructor(private api: ApiService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.loadCategories();


  }

  loadCategories() {

    this.api.getCategories().subscribe({

      next: (res: any) => {

        console.log("CATEGORIES", res);

        this.categories = res;
this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
getCategoryIcon(categoryName: string): string {

  switch (categoryName.toLowerCase()) {

    case 'home cleaning':
      return 'bi bi-house-door-fill';

    case 'beauty & salon':
      return 'bi bi-scissors';

    case 'electrician':
      return 'bi bi-lightning-charge-fill';

    case 'plumbing':
      return 'bi bi-wrench-adjustable-circle-fill';

    case 'painting':
      return 'bi bi-brush-fill';

    case 'carpentry':
      return 'bi bi-hammer';

    case 'gardening':
      return 'bi bi-flower1';

    case 'pest control':
      return 'bi bi-bug-fill';

    case 'ac repair':
      return 'bi bi-snow';

    case 'appliance repair':
      return 'bi bi-tv-fill';

    default:
      return 'bi bi-grid-fill';

  }

}
openCategory(id:number){

  console.log(id);

  this.router.navigate(['/category', id]);

}
}
