import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SalonViewComponent } from './pages/salon-view/salon-view.component';
import { AddNewSalonOwnerComponent } from './popup/add-new-salon-owner/add-new-salon-owner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewSalonComponent } from './popup/add-new-salon/add-new-salon.component';
import { DeleteSalonOwnerComponent } from './popup/delete-salon-owner/delete-salon-owner.component';
import { DeleteSalonComponent } from './popup/delete-salon/delete-salon.component';
import { AddNewCustomerComponent } from './popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from './popup/delete-customer/delete-customer.component';
import { AddNewDistributorComponent } from './popup/add-new-distributor/add-new-distributor.component';
import { DeleteDistributorComponent } from './popup/delete-distributor/delete-distributor.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BookingViewComponent } from './pages/booking-view/booking-view.component';
import { BarberProfileViewComponent } from './pages/barber-profile-view/barber-profile-view.component';

import { LoginComponent } from './popup/login/login.component';

import { SalonsListViewComponent } from './pages/salons-list-view/salons-list-view.component';

import { RegisterComponent } from './popup/register/register.component';
import { SalonEditComponent } from './pages/salon-edit/salon-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddNewSalonOwnerComponent,
    AddNewSalonComponent,
    DeleteSalonOwnerComponent,
    DeleteSalonComponent,
    AddNewCustomerComponent,
    DeleteCustomerComponent,
    AddNewDistributorComponent,
    DeleteDistributorComponent,
    MainLayoutComponent,
    BookingViewComponent,
    LoginComponent,
    RegisterComponent,
    SalonEditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, ]
})
export class AppModule { }
