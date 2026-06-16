import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getPendingProviders() {
    return this.http.get(environments.adminUrl + '/pending');
  }

  approveProvider(id: number) {
    return this.http.post(environments.adminUrl + '/approve/' + id, {});
  }

  createCategory(data: any) {
    return this.http.post(environments.adminUrl + '/category', data);
  }

  getCategories() {
    return this.http.get(environments.adminUrl + '/category');
  }
  deleteCategory(id: number) {
    return this.http.delete(environments.adminUrl + '/category/' + id);
  }
  updateCategory(id: number, data: any) {
    return this.http.put(environments.adminUrl + '/category/' + id, data);
  }
  getStats() {
    return this.http.get(environments.adminUrl + '/stats');
  }
  getUsers() {
    return this.http.get(environments.adminUrl + '/users');
  }

  getServices() {
    return this.http.get(environments.adminUrl + '/services');
  }

  getBookings() {
    return this.http.get(environments.adminUrl + '/bookings');
  }
  deleteUser(id: number) {
    return this.http.delete(environments.adminUrl + '/user/' + id
    );
  }
  deleteService(id: number) {
    return this.http.delete(environments.adminUrl + '/service/' + id, { responseType: 'text' }
    );
  }
  deleteBooking(id: number) {
    return this.http.delete(environments.adminUrl + '/booking/' + id
    );
  }
}
