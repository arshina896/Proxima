import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient){}
  test(){
    return this.http.get(environments.apiUrl+'/test');
  }
  login(email:string,password:string){
    return this.http.post(environments.apiUrl+'/user/login',{
      email:email,
      password:password
    });
  }
}
// {
//   "email": "arshina@gmail.com",
//   "password": "arshina@1"
// }


// {
//   "email": "arshina312@gmail.com",
//   "password": "Admin@1"
// }


// {
//   "email": "anzila@gmail.com",
//   "password": "anzila@1"
// }


// {
//   "email": "shafeeq@gmail.com",
//   "password": "shafeeq@1"
// }