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
}
