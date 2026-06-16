import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {

  constructor(private http: HttpClient) { }

  createService(data: any) {
    return this.http.post(environments.providerUrl, data);
  }

  getService() {
    return this.http.get(environments.providerUrl);
  }

  updateService(id: number, data: any) {
    return this.http.put(environments.providerUrl + '/' + id, data);
  }

  deleteService(id: number) {
    return this.http.delete(environments.providerUrl + '/' + id);
  }

  getCategories() {
    return this.http.get(environments.providerUrl + '/category');
  }

  getProviderBookings() {
    return this.http.get(environments.providerUrl + '/bookings');
  }

  updateBookingStatus(id: number, status: string) {
    return this.http.put(
      environments.providerUrl + '/booking/' + id + '/status',
      { status: status }
    );
  }
  getProviderStats() {
    return this.http.get(environments.providerUrl + '/stats');
  }
  getReviews() {
    return this.http.get(environments.apiUrl +'/serviceprovider/reviews');
  }
}


