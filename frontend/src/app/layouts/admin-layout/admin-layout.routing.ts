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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'salonOwnersList',      component: SalonOwnersListComponent },
    { path: 'owner/:ownerId',      component: SalonViewComponent },
    { path: 'customersList',      component: CustomersListComponent },
];
