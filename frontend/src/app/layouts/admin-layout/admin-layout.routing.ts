import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { SalonOwnersListComponent } from '../../pages/salon-owners-list/salon-owners-list.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { CustomersListComponent } from '../../pages/customers-list/customers-list.component';
import { DistributorListViewComponent } from '../../pages/distributor-list-view/distributor-list-view.component';
import { BarberViewComponent } from '../../pages/barber-view/barber-view.component';
import { BarberProfileViewComponent } from '../../pages/barber-profile-view/barber-profile-view.component';
import { SalonsListViewComponent } from '../../pages/salons-list-view/salons-list-view.component';
import { SalonEditComponent } from '../../pages/salon-edit/salon-edit.component';
import { SalonOwnerProfileComponent } from 'app/pages/salon-owner-profile/salon-owner-profile.component';
import { DistributorProfileComponent } from 'app/pages/distributor-profile/distributor-profile.component';
import { ProductsListViewComponent } from 'app/pages/products-list-view/products-list-view.component';

export const AdminLayoutRoutes: Routes = [

    { path: '',      component: SalonsListViewComponent },
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'profile',           component: UserComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    { path: 'salonOwners',      component: SalonOwnersListComponent },
    { path: 'salonOwners/:salonOwnerId',      component: SalonOwnerProfileComponent },
    { path: 'salonOwners/:salonOwnerId/salons',       component: SalonsListViewComponent },
    { path: 'salonOwners/:salonOwnerId/salons/:salonId',       component: SalonEditComponent },
    { path: 'customers',        component: CustomersListComponent },
    { path: 'salons',               component: SalonsListViewComponent },
    { path: 'distributors',         component: DistributorListViewComponent },
    { path: 'barbers',               component: BarberViewComponent },
    { path: 'distributors/:distributorId/profile',         component: DistributorProfileComponent },
    { path: 'distributors/:distributorId/products',         component: ProductsListViewComponent },
    { path: 'customers/:userId/profile',           component: UserComponent },
    { path: 'barbers/:barberId/profile',           component: BarberProfileViewComponent },
    { path: 'salons/:salonId',               component: SalonEditComponent },
];
