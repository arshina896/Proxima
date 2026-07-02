import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './auth-guard';
import { Register } from './pages/register/register';
import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { MyBookings } from './pages/my-bookings/my-bookings';
import { Services } from './pages/services/services';
import { ServiceDetails } from './pages/service-details/service-details';
import { ServiceBooking } from './pages/service-booking/service-booking';
import { Profile } from './pages/profile/profile';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'home', component: Home },
  { path: 'provider', component: ProviderDashboard },

  { path: 'services', component: Services },
  { path: 'my-bookings', component: MyBookings },
  { path: 'admin', component: AdminDashboard },
  { path: 'service/:id', component: ServiceDetails },
  { path: 'service-booking/:id', component: ServiceBooking },
  { path: 'my-booking', component: MyBookings },
  {path: 'profile',component: Profile},
{ path:'provider/:id',loadComponent:()=>import('./pages/provider-profile/provider-profile').then(c=>c.ProviderProfile)},

];








