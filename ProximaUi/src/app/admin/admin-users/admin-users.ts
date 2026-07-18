import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  search = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.filteredUsers = res;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  searchUser() {

    const value = this.search.toLowerCase();

    this.filteredUsers = this.users.filter(x =>
      x.fullName.toLowerCase().includes(value) ||
      x.email.toLowerCase().includes(value) ||
      x.role.toLowerCase().includes(value)
    );
 this.cdr.detectChanges();

  }

  deleteUser(id: number) {

    if (!confirm('Delete this user?')) return;

    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
 this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}