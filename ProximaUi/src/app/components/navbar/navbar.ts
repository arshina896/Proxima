import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
notifications:any[]=[];
constructor(private api:ApiService){}
ngOnInit(){
  this.loadNotifications();
}
logout(){

localStorage.clear();

window.location.href='/login';

}
loadNotifications(){

this.api
.getNotifications()
.subscribe((res:any)=>{

this.notifications=res;

});

}
}
