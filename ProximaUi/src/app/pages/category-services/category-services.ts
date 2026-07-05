import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-services',
  imports: [CommonModule],
  templateUrl: './category-services.html',
  styleUrls: ['./category-services.css'],
})
export class CategoryServices {
   categoryId = 0;
  services: any[] = [];
  categoryName = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadServices();
this.cdr.detectChanges();
  }

  loadServices() {

    this.api.getServicesByCategory(this.categoryId).subscribe({

      next: (res: any) => {

        console.log("SERVICES =", res);

        this.services = res;

        if (res.length > 0) {
          this.categoryName = res[0].category;
        }
this.cdr.detectChanges();
      }

    });

  }

  viewService(id:number){

    this.router.navigate(['/service',id]);

  }
}
