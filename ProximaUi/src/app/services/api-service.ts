import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
environments
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


  bookingService(serviceId: number) {
    return this.http.post(environments.apiUrl + '/customer', { serviceId: serviceId }

    );
  }
  getMyBookin(){
    return this.http.get(environments.apiUrl+'/customer/myBooking');
  }



getProvider(){
  return this.http.get(environments.apiUrl+'/customer/providerWithService');
}


getCategories() {
  return this.http.get(environments.apiUrl + '/customer/category');
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


