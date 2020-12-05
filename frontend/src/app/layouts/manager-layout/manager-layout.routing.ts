import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { CustomersListComponent } from '../../pages/customers-list/customers-list.component';
import { DistributorViewComponent } from '../../pages/distributor-view/distributor-view.component';
import { BarberViewComponent } from '../../pages/barber-view/barber-view.component';
import { BarberProfileViewComponent } from '../../pages/barber-profile-view/barber-profile-view.component';
import { SalonsListViewComponent } from '../../pages/salons-list-view/salons-list-view.component';
import { SalonEditComponent } from '../../pages/salon-edit/salon-edit.component';
import { BookingsSalonListComponent } from 'app/pages/bookings-salon-list/bookings-salon-list.component';
import { BookingsListViewComponent } from 'app/pages/bookings-list-view/bookings-list-view.component';
import { ProductsListViewComponent } from 'app/pages/products-list-view/products-list-view.component';
import { ProductDetailViewComponent } from 'app/pages/product-detail-view/product-detail-view.component';

export const ManagerLayoutRoutes: Routes = [

    { path: '',      component: SalonsListViewComponent },
    { path: 'profile',           component: UserComponent },    
    { path: 'salons',               component: SalonsListViewComponent },
    { path: 'distributors',         component: DistributorViewComponent },
    { path: 'distributors/:distributorId/products/:productId',         component: ProductDetailViewComponent },
    { path: 'distributors/:distributorId/products',         component: ProductsListViewComponent },    
    { path: 'barbers',               component: BarberViewComponent },
    { path: 'bookings',               component: BookingsSalonListComponent },
    { path: 'profile/customer/:userId',           component: UserComponent },
    { path: 'barbers/:userId',           component: BarberProfileViewComponent },
    { path: 'salons/:salonId',               component: SalonEditComponent },
    { path: 'bookings/:salonId',               component: BookingsListViewComponent },
    { path: 'distributors/:distributorId/profile',           component: UserComponent },
];