import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
   standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
 profile: any = {};

  selectedFile: File | null = null;

  imagePreview: string = '';

  constructor(private api: ApiService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.loadProfile();

  }

 loadProfile() {

  this.api.getProfile().subscribe({

    next: (res: any) => {

      console.log("Profile Response:", res);

      this.profile = { ...res };

      if (res.profileImage) {
        this.imagePreview =
          'https://localhost:7040/' + res.profileImage;
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

onFileSelected(event: Event) {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0)
    return;

  const file = input.files[0];

  this.selectedFile = file;

  const reader = new FileReader();

  reader.onload = () => {

    this.imagePreview = reader.result as string;

  };

  reader.readAsDataURL(file);

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

    formData.append(
      "DateOfBirth",
      this.profile.dateOfBirth
    );

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

    this.api.updateProfile(formData)

      .subscribe({

        next: () => {

          alert("Profile Updated Successfully ✅");

          this.loadProfile();

        },

        error: err => {

          console.log(err);

        }

      });

  }
}