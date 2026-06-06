import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './auth-guard';
import { Register } from './pages/register/register';
import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { MyBookings } from './pages/my-bookings/my-bookings';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  // { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'home', component: Home},
  {path:'provider',component:ProviderDashboard},
  
  {path:'services',component:Services},
  {path:'my-bookings',component:MyBookings},
  {path:'admin',component:AdminDashboard},

];








