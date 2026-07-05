import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Home } from './pages/home/home';
import { ProviderDashboard } from './pages/provider-dashboard/provider-dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { Services } from './pages/services/services';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { ServiceDetails } from './pages/service-details/service-details';
import { ServiceBooking } from './pages/service-booking/service-booking';
import { Profile } from './pages/profile/profile';
import { ProviderProfile } from './pages/provider-profile/provider-profile';

export const routes: Routes = [
    { path: '', component: Auth },
    {path: 'home',component: Home },

    { path: 'provider',component: ProviderDashboard},

    { path: 'admin',component: AdminDashboard },

    { path: 'services',component: Services},

    { path: 'my-bookings',component: MyBookings},

    { path: 'service/:id',component: ServiceDetails},

    { path: 'service-booking/:id',component: ServiceBooking},

    {path: 'profile',component: Profile},

    {path: 'provider/:id',component: ProviderProfile}
];
