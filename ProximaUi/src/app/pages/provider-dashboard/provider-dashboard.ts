
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-dashboard.html',
  styleUrl: './provider-dashboard.css',
})
export class ProviderDashboard implements OnInit {

  bookings: any[] = [];
  categories: any[] = [];
  services: any[] = [];

  categoryId: number | null = null;
  serviceName = "";
  price: number | null = null;

  editMode = false;
  editServiceId: number | null = null;

  selectedFile: File | null = null;
  reviewData: any;

  stats: any = {
    totalServices: 0,
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0
  };

  constructor(private api: ServiceProviderService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadBooking();
    this.loadCategories();
    this.getService();
    this.loadStats();
    this.getReviews();
  }

  loadBooking() {
    this.api.getProviderBookings().subscribe({
      next: (res: any) => {

        console.log("Bookings:", res);

        this.bookings = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log("BOOKING ERROR", err);
      }
    });
  }
  //status
  loadStats() {
    this.api.getProviderStats().subscribe({
      next: (res: any) => {
        console.log("provider stats", res);
        this.stats = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  // ✅ Services
  getService() {
    this.api.getService().subscribe((res: any) => {
      console.log("services", res);
      this.services = res;
      this.cdr.detectChanges();
    });
  }
  // ✅ Categories
  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      console.log("Categories:", res);
      this.categories = res;
      this.cdr.detectChanges();
    });
  }


  createService() {
    if (!this.serviceName || !this.price || !this.categoryId) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", this.serviceName);
    formData.append("price", this.price.toString());
    formData.append("serviceCategoryId", this.categoryId.toString());
    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }
    this.api.createService(formData).subscribe({
      next: (res: any) => {
        console.log("API RES:", res);
        this.getService();
        this.resetForm();

        alert("Service created successfully");

      },
      error: (err) => {
        console.log(err);
        alert("Failed to create service");
      }
    });
  }

  // ✅ EDIT
  startEdit(service: any) {
    console.log("Edit service", service);

    this.serviceName = service.serviceName;
    this.price = service.price;

    const cat = this.categories.find(c => c.categoryName === service.categoryName);
    this.categoryId = cat ? cat.id : null;
    this.selectedFile = null;
    this.editMode = true;
    this.editServiceId = service.id;
    console.log("EDIT ID =", this.editServiceId);
  }

  // ✅ UPDATE
  // saveService() {
  //   if (!this.serviceName || !this.price || !this.categoryId) {
  //     alert("Fill all fields");
  //     return;
  //   }

  //   const data = {
  //     serviceName: this.serviceName,
  //     price: this.price,
  //     serviceCategoryId: this.categoryId
  //   };

  //   this.api.updateService(this.editServiceId!, data)
  //     .subscribe({

  //       next: () => {

  //         this.getService();

  //         this.resetForm();

  //         alert("Updated Successfully");
  //       },
  //       error: (err) => {

  //         console.log("UPDATE ERROR", err);
  //         console.log("SERVER ERROR", err.error);
  //       }
  //     });
  // }
  saveService() {

    if (
      !this.serviceName ||
      !this.price ||
      !this.categoryId
    ) {

      alert("Fill all fields");

      return;

    }

    const formData =
      new FormData();

    formData.append(
      "serviceName",
      this.serviceName
    );

    formData.append(
      "price",
      this.price.toString()
    );

    formData.append(
      "serviceCategoryId",
      this.categoryId.toString()
    );

    if (
      this.selectedFile
    ) {

      formData.append(
        "image",
        this.selectedFile
      );

    }

    this.api
      .updateService(
        this.editServiceId!,
        formData
      )

      .subscribe({

        next: () => {

          this.getService();

          this.resetForm();

          alert(
            "Updated Successfully"
          );

        },

        error: (err) => {

          console.log(
            "UPDATE ERROR",
            err
          );

          console.log(
            err.error
          );

        }

      });

  }
  // ✅ DELETE
  deleteService(id: number) {
    console.log("Delete ID=", id);
    if (!confirm("Are you sure?")) return;

    this.api.deleteService(id).subscribe({
      next: (res) => {
        console.log("Deleted:", id);
        this.services = this.services.filter(s => Number(s.id) !== Number(id));
        this.services = [...this.services];

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log("DELETE ERROR", err);
      }
    });
  }

  // ✅ Booking status
  updateStatus(id: number, status: string) {
    this.api.updateBookingStatus(id, status.toUpperCase()).subscribe(() => {
      this.loadBooking();
    });
  }

  // ✅ RESET (fixed)
  resetForm() {
    this.serviceName = "";
    this.price = null;
    this.categoryId = null;
    this.editMode = false;
    this.editServiceId = null;
  }

  onFileSelected(event: any) {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      console.log(this.selectedFile);

    }

  }
  // ✅ TRACK BY (important for UI refresh)
  trackById(index: number, item: any) {
    return item.id;
  }
  getReviews() {

    this.api.getReviews()
      .subscribe({

        next: (res) => {

          console.log("REVIEWS=", res);

          this.reviewData = res;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log("REVIEW ERROR=", err);

        }

      });

  }
}