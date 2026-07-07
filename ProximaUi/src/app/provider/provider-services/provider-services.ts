import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-services',
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-services.html',
  styleUrl: './provider-services.css',
})
export class ProviderServices implements OnInit{
  categories: any[] = [];
  services: any[] = [];

  categoryId: number | null = null;
  serviceName = '';
  description = '';
  price: number | null = null;

  editMode = false;
  editServiceId: number | null = null;

  selectedFile: File | null = null;

  constructor(
    private api: ServiceProviderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadCategories();

    this.getService();

  }

  // ===========================
  // LOAD SERVICES
  // ===========================

  getService() {

    this.api.getService().subscribe({

      next: (res: any) => {

        console.log("Services:", res);

        this.services = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // LOAD CATEGORIES
  // ===========================

  loadCategories() {

    this.api.getCategories().subscribe({

      next: (res: any) => {

        console.log("Categories:", res);

        this.categories = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // CREATE SERVICE
  // ===========================

  createService() {

    if (!this.serviceName || !this.price || !this.categoryId) {

      alert("Fill all fields");

      return;

    }

    const formData = new FormData();

    formData.append("serviceName", this.serviceName);

    formData.append("description", this.description);

    formData.append("price", this.price.toString());

    formData.append("serviceCategoryId", this.categoryId.toString());

    if (this.selectedFile) {

      formData.append("image", this.selectedFile);

    }

    this.api.createService(formData).subscribe({

      next: () => {

        alert("Service Created Successfully");

        this.getService();

        this.resetForm();

      },

      error: (err) => {

        console.log(err);

        alert("Failed to Create Service");

      }

    });

  }

  // ===========================
  // EDIT SERVICE
  // ===========================

  startEdit(service: any) {

    this.serviceName = service.serviceName;

    this.description = service.description || '';

    this.price = service.price;

    const cat = this.categories.find(c => c.categoryName === service.categoryName);

    this.categoryId = cat ? cat.id : null;

    this.selectedFile = null;

    this.editMode = true;

    this.editServiceId = service.id;

  }

  // ===========================
  // UPDATE SERVICE
  // ===========================

  saveService() {

    if (!this.serviceName || !this.price || !this.categoryId) {

      alert("Fill all fields");

      return;

    }

    const formData = new FormData();

    formData.append("serviceName", this.serviceName);

    formData.append("description", this.description);

    formData.append("price", this.price.toString());

    formData.append("serviceCategoryId", this.categoryId.toString());

    if (this.selectedFile) {

      formData.append("image", this.selectedFile);

    }

    this.api.updateService(this.editServiceId!, formData)

      .subscribe({

        next: () => {

          alert("Service Updated Successfully");

          this.getService();

          this.resetForm();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ===========================
  // DELETE SERVICE
  // ===========================

  deleteService(id: number) {

    if (!confirm("Are you sure you want to delete this service?")) {

      return;

    }

    this.api.deleteService(id).subscribe({

      next: () => {

        this.services = this.services.filter(s => s.id != id);

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // FILE UPLOAD
  // ===========================

  onFileSelected(event: any) {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

    }

  }

  // ===========================
  // RESET FORM
  // ===========================

  resetForm() {

    this.serviceName = '';

    this.description = '';

    this.price = null;

    this.categoryId = null;

    this.selectedFile = null;

    this.editMode = false;

    this.editServiceId = null;

  }

  // ===========================
  // TRACK BY
  // ===========================

  trackById(index: number, item: any) {

    return item.id;

  }

}
