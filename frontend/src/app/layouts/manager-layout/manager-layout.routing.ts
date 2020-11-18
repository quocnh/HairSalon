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

export const ManagerLayoutRoutes: Routes = [

    { path: '',      component: SalonsListViewComponent },
    { path: 'profile',           component: UserComponent },    
    { path: 'customersList',        component: CustomersListComponent },
    { path: 'salons',               component: SalonsListViewComponent },
    { path: 'distributors',         component: DistributorViewComponent },
    { path: 'barbers',               component: BarberViewComponent },
    { path: 'profile/customer/:userId',           component: UserComponent },
    { path: 'profile/barber/:userId',           component: BarberProfileViewComponent },
    { path: 'salons/:salonId',               component: SalonEditComponent },
];
