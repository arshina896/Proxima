import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories implements OnInit {

  categories: any[] = [];
  filteredCategories: any[] = [];

  search = '';

  categoryName = '';

  editMode = false;
  editCategoryId: number | null = null;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {

    this.adminService.getCategories().subscribe({

      next: (res: any) => {

        this.categories = res;
        this.filteredCategories = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  searchCategory() {

    const value = this.search.toLowerCase();

    this.filteredCategories = this.categories.filter(x =>

      x.categoryName.toLowerCase().includes(value)

    );

    this.cdr.detectChanges();

  }

  saveCategory() {

    if (!this.categoryName.trim()) {

      alert('Enter Category Name');
      return;

    }

    if (this.editMode) {

      this.adminService.updateCategory(this.editCategoryId!, {

        categoryName: this.categoryName

      }).subscribe({

        next: () => {

          alert('Category Updated');

          this.resetForm();

          this.loadCategories();

        },

        error: (err) => {

          alert(err.error);

        }

      });

    }

    else {

      this.adminService.createCategory({

        categoryName: this.categoryName

      }).subscribe({

        next: () => {

          alert('Category Added');

          this.resetForm();

          this.loadCategories();

        },

        error: (err) => {

          alert(err.error);

        }

      });

    }

  }

  editCategory(category: any) {

    this.editMode = true;

    this.editCategoryId = category.id;

    this.categoryName = category.categoryName;

  }

  deleteCategory(id: number) {

    if (!confirm('Delete this category?')) return;

    this.adminService.deleteCategory(id).subscribe({

      next: () => {

        this.loadCategories();
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  resetForm() {

    this.categoryName = '';

    this.editMode = false;

    this.editCategoryId = null;

  }

}