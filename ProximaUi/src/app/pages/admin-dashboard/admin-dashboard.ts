import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  pendingProviders: any[] = [];
  loading = false;
  categories: any[] = [];
  newCategory = "";
  editMode = false;
  editCategoryId: number | null = null;

  constructor(private adminService: AdminService, private router: Router, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getPendingProviders();
    this.getCategories();

    setTimeout(() => {
      this.cdr.detectChanges();
    });

  }



  getPendingProviders() {
    this.loading = true;

    this.adminService.getPendingProviders().subscribe({
      next: (res: any) => {
        this.pendingProviders = res;

        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }


  approve(id: number) {
    this.adminService.approveProvider(id).subscribe(() => {
      alert("Approved successfully");
      this.getPendingProviders();
    });
  }


  createCategory() {
    if (!this.newCategory) {
      alert("Enter category name");
      return;
    }
    this.adminService.createCategory({ categoryName: this.newCategory })
      .subscribe({
        next: () => {
          alert("Category created");
          this.newCategory = "";
          this.getCategories();
        },
        error: (err) => {
          if (err.status !== 400) {
            console.error(err); 
          }
        }
      }
      );
  }

  getCategories() {
    this.adminService.getCategories().subscribe({
      next: (res: any) => {
        console.log("CATEGORIES:", res);

        this.categories = res;

        setTimeout(() => {
          this.cdr.detectChanges();
        });

      },
      error: (err) => {
        console.log("CATEGORY ERROR:", err);
      }
    });
  }

  startEdit(category: any) {
    this.newCategory = category.categoryName;
    this.editMode = true;
    this.editCategoryId = category.id;
  }
  saveCategory() {
    if (!this.newCategory) {
      alert("Enter category name");

      return;
    }
    this.adminService.updateCategory(this.editCategoryId!, {
      categoryName: this.newCategory
    }).subscribe({
      next: () => {
        alert("Update successfully");
        this.resetForm();
        this.getCategories();
      },
      error: (err) => {
        alert(err.error);

      }
    });
  }


 deleteCategory(id: number) {
  if (!confirm("Are you sure?")) return;

  this.adminService.deleteCategory(id).subscribe({
    next: () => {
      alert("Deleted successfully");
      this.getCategories();
    },
    error: (err) => {
    
      if (err.status === 200) {
        alert("Deleted successfully");
        this.getCategories();
      }
    }
  });
}
  resetForm() {
    this.newCategory = "";
    this.editMode = false;
    this.editCategoryId = null;
  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
