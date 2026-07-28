import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  profile: any = {};

  selectedFile: File | null = null;

  imagePreview: string = '';
role = localStorage.getItem("role");
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.loadProfile();
console.log(this.role);
  }

  loadProfile() {

    this.api.getProfile().subscribe({

      next: (res: any) => {

        console.log("Profile Response:", res);

        this.profile = { ...res };

        if (res.profileImage) {
          // this.imagePreview =
          //   'https://localhost:7040/' + res.profileImage;
          this.imagePreview =
            'https://localhost:7040/' +
            res.profileImage +
            '?t=' +
            new Date().getTime();
        } else {
          this.imagePreview = '';
        }

        this.cdr.detectChanges();

      },

      error: err => {
        console.log(err);
      }

    });

  }

  // onFileSelected(event: Event) {

  //   const input = event.target as HTMLInputElement;

  //   if (!input.files || input.files.length === 0)
  //     return;

  //   const file = input.files[0];

  //   this.selectedFile = file;

  //   const reader = new FileReader();

  //   reader.onload = () => {

  //     this.imagePreview = reader.result as string;

  //   };

  //   reader.readAsDataURL(file);
  //   this.cdr.detectChanges();
  // }
  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0)
      return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result as string;

      this.cdr.detectChanges();

    };

    reader.readAsDataURL(this.selectedFile);

  }
  saveProfile() {

    const formData = new FormData();

    formData.append(
      "FullName",
      this.profile.fullName
    );

    formData.append(
      "Phone",
      this.profile.phoneNumber
    );

    formData.append(
      "Gender",
      this.profile.gender
    );

 if (this.profile.dateOfBirth != null &&
    this.profile.dateOfBirth != "") {

  formData.append(
    "DateOfBirth",
    this.profile.dateOfBirth
  );

}

    formData.append(
      "Address",
      this.profile.address
    );

    formData.append(
      "City",
      this.profile.city
    );

    formData.append(
      "State",
      this.profile.state
    );

    formData.append(
      "Pincode",
      this.profile.pincode
    );

    formData.append(
      "About",
      this.profile.about
    );

    if (this.selectedFile) {

      formData.append(
        "ProfileImage",
        this.selectedFile
      );

    }
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    this.api.updateProfile(formData)

      .subscribe({

        next: () => {

          alert("Profile Updated Successfully ✅");

          this.loadProfile();
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

          console.log("STATUS =", err.status);

          console.log("ERROR =", err.error);

        }

      });

  }
applyProvider() {

  this.api.applyProvider().subscribe({

    next: (res: any) => {

      alert("Application submitted successfully ✅");

    },

    error: (err) => {

      alert(err.error);

    }

  });

}


}