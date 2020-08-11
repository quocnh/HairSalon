import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
import { CustomerViewComponent } from './pages/customer-view/customer-view.component';
import { AddNewCustomerComponent } from './popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from './popup/delete-customer/delete-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddNewSalonOwnerComponent,
    AddNewSalonComponent,
    DeleteSalonOwnerComponent,
    DeleteSalonComponent,
    CustomerViewComponent,
    AddNewCustomerComponent,
    DeleteCustomerComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
