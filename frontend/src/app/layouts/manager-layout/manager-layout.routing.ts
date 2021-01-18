import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { CustomersListComponent } from '../../pages/customers-list/customers-list.component';
import { DistributorListViewComponent } from '../../pages/distributor-list-view/distributor-list-view.component';
import { BarberViewComponent } from '../../pages/barber-view/barber-view.component';
import { BarberProfileViewComponent } from '../../pages/barber-profile-view/barber-profile-view.component';
import { SalonsListViewComponent } from '../../pages/salons-list-view/salons-list-view.component';
import { SalonEditComponent } from '../../pages/salon-edit/salon-edit.component';
import { BookingsSalonListComponent } from 'app/pages/bookings-salon-list/bookings-salon-list.component';
import { BookingsListViewComponent } from 'app/pages/bookings-list-view/bookings-list-view.component';
import { ProductsListViewComponent } from 'app/pages/products-list-view/products-list-view.component';
import { ProductDetailViewComponent } from 'app/pages/product-detail-view/product-detail-view.component';
import { SalonOwnerProfileComponent } from 'app/pages/salon-owner-profile/salon-owner-profile.component';
import { DistributorProfileComponent } from 'app/pages/distributor-profile/distributor-profile.component';
import { BookingViewComponent } from 'app/pages/booking-view/booking-view.component';
import { BarbersSalonListComponent } from 'app/pages/barbers-salon-list/barbers-salon-list.component';


export const ManagerLayoutRoutes: Routes = [

    { path: '',      component: SalonsListViewComponent },
    { path: 'profile',           component: SalonOwnerProfileComponent },    
    { path: 'salons',               component: SalonsListViewComponent },
    { path: 'distributors',         component: DistributorListViewComponent },
    { path: 'distributors/:distributorId/products/:productId',         component: ProductDetailViewComponent },
    { path: 'distributors/:distributorId/products',         component: ProductsListViewComponent },
    { path: 'distributors/:distributorId/profile',           component: DistributorProfileComponent },
    { path: 'barbers',               component: BarbersSalonListComponent },
    { path: 'barbers/:salonId',               component: BarberViewComponent },
    { path: 'bookings',               component: BookingsSalonListComponent },
    { path: 'barbers/:salonId/profile/:barberId',           component: BarberProfileViewComponent },
    { path: 'salons/:salonId',               component: SalonEditComponent },
    { path: 'bookings/:salonId',               component: BookingsListViewComponent },
    { path: 'bookings/:salonId/:bookingId',               component: BookingViewComponent },
   
];
