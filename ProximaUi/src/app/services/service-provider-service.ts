import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  constructor(private http: HttpClient) { }

  // ✅ Create Service
  createService(data: any) {
    return this.http.post(environments.providerUrl, data);
  }

  // ✅ Get Provider Bookings
  getProviderBookings() {
    return this.http.get(environments.providerUrl + '/bookings');
  }
  // ✅ Update Booking Status (OLD STYLE)
  updateBookingStatus(id: number, status: string) {
    return this.http.put(
      environments.providerUrl + '/booking/' + id + '/status',
      { status: status }
    );
  }
  getCategories() {
    return this.http.get(environments.providerUrl + '/category');
  }
  getService() {
    return this.http.get(environments.providerUrl);
  }
}
