import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { authGuard } from './auth-guard';
import { Register } from './pages/register/register';



import { MyBookings } from './pages/my-bookings/my-bookings';
import { Services } from './pages/services/services';
import { ServiceDetails } from './pages/service-details/service-details';
import { ServiceBooking } from './pages/service-booking/service-booking';
import { Profile } from './pages/profile/profile';
import { Auth } from './pages/auth/auth';
import { CategoryServices } from './pages/category-services/category-services';
// import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { ProviderDashboard } from './provider/provider-dashboard/provider-dashboard';
import { CustomerChat } from './pages/customer-chat/customer-chat';
import { ProviderChat } from './provider/provider-chat/provider-chat';
import { CustomerChatList } from './pages/customer-chat-list/customer-chat-list';
import { ProviderChatList } from './provider/provider-chat-list/provider-chat-list';
import { AdminLayout } from './admin/admin-layout/admin-layout';
// import { ProviderProfile } from './pages/provider-profile/provider-profile';
export const routes: Routes = [
  { path: '', component: Auth },
  { path: 'login', component: Auth },


  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'provider', component: ProviderDashboard, canActivate: [authGuard] },

  { path: 'services', component: Services, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookings, canActivate: [authGuard] },

  { path: 'service/:id', component: ServiceDetails, canActivate: [authGuard] },
  { path: 'service-booking/:id', component: ServiceBooking, canActivate: [authGuard] },
  { path: 'my-booking', component: MyBookings, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'provider/:id', loadComponent: () => import('./pages/provider-profile/provider-profile').then(c => c.ProviderProfile) },
  { path: 'category/:id', component: CategoryServices },
  { path: 'customer-chat', component: CustomerChat, canActivate: [authGuard] },
  { path: 'provider-chat', component: ProviderChat, canActivate: [authGuard] },
  { path: 'customer-chat-list', component: CustomerChatList, canActivate: [authGuard] },
  { path: 'provider-chat-list', component: ProviderChatList, canActivate: [authGuard] },

{ path: 'admin', component: AdminLayout},

];








