import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(environments.apiUrl + '/user/login', data);
  }

  register(data: any) {
    return this.http.post(environments.apiUrl + '/user/register', data);
  }

  getService() {
    return this.http.get(environments.apiUrl + '/customer');
  }


  bookingService(data: any) {
    return this.http.post(environments.apiUrl + '/customer', data);
  }
  getMyBooking() {
    return this.http.get(environments.apiUrl + '/customer/myBooking');
  }

  getProvider() {
    return this.http.get(environments.apiUrl + '/customer/providerWithService');
  }

  cancelBooking(id: number) {
    return this.http.put(environments.apiUrl + '/customer/cancel/' + id, {});

  }
  getCategories() {
    return this.http.get(environments.apiUrl + '/customer/category');
  }
  addReview(data: any) {
    return this.http.post(environments.apiUrl + '/customer/review', data);
  }
  searchServices(data: any) {

    return this.http.get(environments.apiUrl + '/customer/search?keyword=' + data.keyword + '&categoryId=' + data.categoryId);

  }
  completeBooking(id: number) {
    return this.http.put(environments.apiUrl + '/customer/complete/' + id, {});
  }
  getNotifications() {
    return this.http.get(environments.apiUrl + '/customer/notifications'
    );

  }
  createBooking(data: any) {
    return this.http.post(environments.apiUrl + '/customer', data);
  }
  //profile
  getProfile() {
    return this.http.get(environments.apiUrl + '/profile');
  }

  updateProfile(data: FormData) {
    return this.http.put(environments.apiUrl + '/profile', data);
  }
  getAllProviders() {
    return this.http.get(environments.apiUrl + '/customer/providers');
  }
  //provider profile
  getProviderProfile(id: number) {
    return this.http.get(environments.apiUrl + '/customer/provider/' + id);
  }

  getServicesByCategory(categoryId: number) {
    return this.http.get(
      environments.apiUrl + '/customer/category/' + categoryId
    );
  }

}

// //   "email": "arshina@gmail.com",
// //   "password": "arshina@1"
// // }


// // {
// //   "email": "arshina312@gmail.com",
// //   "password": "Admin@1"
// // }


// // {
// //   "email": "anzila@gmail.com",
// //   "password": "anzila@1"
// // }


// // {
// //   "email": "shafeeq@gmail.com",
// //   "password": "shafeeq@1"
// // }


