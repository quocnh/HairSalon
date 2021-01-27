import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/userProfile/userProfile.component';
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
import { ProductDetailEditComponent } from 'app/pages/product-detail-edit/product-detail-edit.component';
import { ProductOrdersListViewComponent } from 'app/pages/product-orders-list-view/product-orders-list-view.component';
import { RegisterListBecomeSalonOwnerComponent } from 'app/pages/register-list-become-salon-owner/register-list-become-salon-owner.component';
import { RegisterListBecomeDistributorComponent } from 'app/pages/register-list-become-distributor/register-list-become-distributor.component';
import { BarbersSalonListComponent } from 'app/pages/barbers-salon-list/barbers-salon-list.component';

export const AdminLayoutRoutes: Routes = [

    { path: '',      component: SalonsListViewComponent },
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'profile2',           component: UserProfileComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },

    { path: 'become-salonowner-request',  component: RegisterListBecomeSalonOwnerComponent },
    { path: 'become-distributor-request',  component: RegisterListBecomeDistributorComponent },
    { path: 'profile',               component: UserProfileComponent },

    { path: 'salonOwners',      component: SalonOwnersListComponent },
    { path: 'salonOwners/:salonOwnerId',      component: SalonOwnerProfileComponent },
    { path: 'salonOwners/:salonOwnerId/salons',       component: SalonsListViewComponent },
    { path: 'salonOwners/:salonOwnerId/salons/:salonId',       component: SalonEditComponent },

    { path: 'customers',        component: CustomersListComponent },
    { path: 'customers/:userId/profile',           component: UserProfileComponent },

    { path: 'salons',               component: SalonsListViewComponent },    
    { path: 'salons/:salonId',               component: SalonEditComponent },
    { path: 'salons/barbers/:salonId',               component: BarberViewComponent },

    { path: 'distributors',         component: DistributorListViewComponent },    
    { path: 'distributors/:distributorId/profile',         component: DistributorProfileComponent },
    { path: 'distributors/:distributorId/products',         component: ProductsListViewComponent },
    { path: 'distributors/:distributorId/products/:productId',         component: ProductDetailEditComponent },
    { path: 'distributors/:distributorId/productOrders',         component: ProductOrdersListViewComponent },    

    { path: 'barbers',               component: BarberViewComponent },    
    { path: 'barbers/:salonId/profile/:barberId',           component: BarberProfileViewComponent },
];    
