import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalonOwnersListComponent } from '../../pages/salon-owners-list/salon-owners-list.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { CustomersListComponent } from '../../pages/customers-list/customers-list.component';
import { DistributorListViewComponent } from '../../pages/distributor-list-view/distributor-list-view.component';
import { BarberViewComponent } from '../../pages/barber-view/barber-view.component';
import { BarberProfileViewComponent } from '../../pages/barber-profile-view/barber-profile-view.component';
import { SalonsListViewComponent } from '../../pages/salons-list-view/salons-list-view.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgImageSliderModule,
    AutocompleteLibModule
  ],
  declarations: [
    // SalonOwnersListComponent,
    // CustomersListComponent,
    // DistributorListViewComponent,
    // BarberViewComponent,
    // DashboardComponent,
    // UserComponent,
    // TableComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // BarberProfileViewComponent,
    // SalonsListViewComponent
  ]
})

export class AdminLayoutModule {}
