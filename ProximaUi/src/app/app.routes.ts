import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './auth-guard';
import { Register } from './pages/register/register';

import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { MyBookings } from './pages/my-bookings/my-bookings';
import { Services } from './pages/services/services';
import { ServiceDetails } from './pages/service-details/service-details';
import { ServiceBooking } from './pages/service-booking/service-booking';
import { Profile } from './pages/profile/profile';
import { Auth } from './pages/auth/auth';
import { CategoryServices } from './pages/category-services/category-services';
// import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { ProviderDashboard } from './provider/provider-dashboard/provider-dashboard';
// import { ProviderProfile } from './pages/provider-profile/provider-profile';
export const routes: Routes = [
  { path: '', component: Auth },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'provider', component: ProviderDashboard, canActivate: [authGuard] },
  // { path: 'provider', component: ProviderDashboard ,canActivate: [authGuard]},

  { path: 'services', component: Services, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookings, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboard, canActivate: [authGuard] },
  { path: 'service/:id', component: ServiceDetails, canActivate: [authGuard] },
  { path: 'service-booking/:id', component: ServiceBooking, canActivate: [authGuard] },
  { path: 'my-booking', component: MyBookings, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'provider/:id', loadComponent: () => import('./pages/provider-profile/provider-profile').then(c => c.ProviderProfile) },
  { path: 'category/:id', component: CategoryServices },
 
];








