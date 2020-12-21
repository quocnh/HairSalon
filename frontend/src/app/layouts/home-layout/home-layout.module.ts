import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeLayoutRoutes } from './home-layout.routing';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { LightboxModule } from 'ngx-lightbox';
import { HomeComponent } from 'app/pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    NgbModule,
    LightboxModule,
  ],
  declarations: [
    HomeComponent,
    SalonViewComponent,
  ]
})

export class HomeLayoutModule {}
