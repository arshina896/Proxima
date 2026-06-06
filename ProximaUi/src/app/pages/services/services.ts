
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  services: any[] = [];


  filteredServices: any[] = [];

  searchText: string = '';

  categories: any[] = [];
  selectedCategory: string = '';
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadService();
    this.getCategories();
  }
  loadService() {
    this.api.getService().subscribe({

      next: (res: any) => {
        console.log("service:", res);

        this.services = res;
        this.filteredServices = res;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  bookingService(id: number) {
    this.api.bookingService(id).subscribe({
      next: (res) => {
        alert("waiting for confrimation");
        console.log(res);

      },
      error: (err) => {
        console.log(err);
        alert("your booking faild");
      }
    });
  }
  getCategories() {
    this.api.getCategories().subscribe({
      next: (res: any) => {
        console.log("Category:", res);

        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  filterServices() {
    this.filteredServices = this.services.filter(s => {

      const matchesSearch =
        s.serviceName.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        !this.selectedCategory || s.category == this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }
}