import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

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

import { LoginComponent } from './popup/login/login.component';
import { RegisterComponent } from './popup/register/register.component';
import { SalonEditComponent } from './pages/salon-edit/salon-edit.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { BookingsSalonListComponent } from './pages/bookings-salon-list/bookings-salon-list.component';
import { BookingsListViewComponent } from './pages/bookings-list-view/bookings-list-view.component';
import { DistributorLayoutComponent } from './layouts/distributor-layout/distributor-layout.component';
import { ProductsListViewComponent } from './pages/products-list-view/products-list-view.component';
import { ProductOrdersListViewComponent } from './pages/product-orders-list-view/product-orders-list-view.component';
import { AddNewProductComponent } from './popup/add-new-product/add-new-product.component';
import { ProductDetailViewComponent } from './pages/product-detail-view/product-detail-view.component';
import { DeleteAnyComponent } from './popup/delete-any/delete-any.component';
import { ProductDetailEditComponent } from './pages/product-detail-edit/product-detail-edit.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SalonOwnerProfileComponent } from './pages/salon-owner-profile/salon-owner-profile.component';
import { DistributorProfileComponent } from './pages/distributor-profile/distributor-profile.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { BecomeSalonownerComponent } from './pages/become-salonowner/become-salonowner.component';
import { BecomeDistributorComponent } from './pages/become-distributor/become-distributor.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SalonsListViewComponent } from './pages/salons-list-view/salons-list-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/userProfile/userProfile.component';
import { BarberProfileViewComponent } from './pages/barber-profile-view/barber-profile-view.component';
import { BarberViewComponent } from './pages/barber-view/barber-view.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { SalonOwnersListComponent } from './pages/salon-owners-list/salon-owners-list.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { IconsComponent } from './pages/icons/icons.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { TableComponent } from './pages/table/table.component';
import { DistributorListViewComponent } from './pages/distributor-list-view/distributor-list-view.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ModifyBookingComponent } from './popup/modify-booking/modify-booking.component';
import { ConfirmComponent } from './popup/confirm/confirm.component';
import { RegisterListBecomeSalonOwnerComponent } from './pages/register-list-become-salon-owner/register-list-become-salon-owner.component';
import { RegisterListBecomeDistributorComponent } from './pages/register-list-become-distributor/register-list-become-distributor.component';
import { BarbersSalonListComponent } from './pages/barbers-salon-list/barbers-salon-list.component';
import { AddNewBarberComponent } from './popup/add-new-barber/add-new-barber.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { confirmProductOrderComponent } from './popup/confirm_productOrder/confirm_productOrder.component';
import { ForgetPasswordComponent } from './popup/forget-password/forget-password.component';
import { SelectBarberComponent } from './popup/select-barber/select-barber.component';
import { EmailVerificationComponent } from './pages/emailVerification/emailVerification.component';
import { EmailForgetPasswordComponent } from './pages/emailForgetPassword/emailForgetPassword.component';

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
    AddNewBarberComponent,
    MainLayoutComponent,
    HomeLayoutComponent,
    BookingViewComponent,
    LoginComponent,
    ForgetPasswordComponent,
    SelectBarberComponent,
    RegisterComponent,
    SalonEditComponent,
    ManagerLayoutComponent,
    BookingsSalonListComponent,
    BookingsListViewComponent,
    DistributorLayoutComponent,
    ProductsListViewComponent,
    ProductOrdersListViewComponent,
    AddNewProductComponent,
    ProductDetailViewComponent,
    DeleteAnyComponent,
    ProductDetailEditComponent,
    SalonOwnerProfileComponent,
    DistributorProfileComponent,
    BecomeSalonownerComponent,
    BecomeDistributorComponent,    
    SalonsListViewComponent,
    DashboardComponent,
    UserProfileComponent,
    EmailVerificationComponent,
    EmailForgetPasswordComponent,
    BarberProfileViewComponent,
    BarberViewComponent,
    CustomersListComponent,
    SalonOwnersListComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    DistributorListViewComponent,
    MainPageComponent,
    ModifyBookingComponent,
    ConfirmComponent,
    confirmProductOrderComponent,
    RegisterListBecomeSalonOwnerComponent,
    RegisterListBecomeDistributorComponent,
    BarbersSalonListComponent,    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(AppRoutingModule, {
    //   useHash: true
    // }),
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
    AutocompleteLibModule,
    NgImageSliderModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, ]
})
export class AppModule { }
