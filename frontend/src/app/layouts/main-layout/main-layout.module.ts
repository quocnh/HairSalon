import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutRoutes } from './main-layout.routing';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { LightboxModule } from 'ngx-lightbox';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    NgbModule,
    LightboxModule,
    AutocompleteLibModule
  ],
  declarations: [
    MainPageComponent,
    SalonViewComponent,
  ]
})

export class MainLayoutModule {}
