import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.css'
})
export class AdminServices implements OnInit {

  services: any[] = [];
  filteredServices: any[] = [];

  search = '';

  constructor(private adminService: AdminService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {

    this.adminService.getServices().subscribe({

      next: (res: any) => {

        this.services = res;
        this.filteredServices = res;
 this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  searchService() {

    const value = this.search.toLowerCase();

    this.filteredServices = this.services.filter(x =>

      x.serviceName.toLowerCase().includes(value) ||

      x.category.toLowerCase().includes(value)

    );
 this.cdr.detectChanges();
  }

  deleteService(id: number) {

    if (!confirm('Delete this service?')) return;

    this.adminService.deleteService(id).subscribe({

      next: () => {

        this.loadServices();
 this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}