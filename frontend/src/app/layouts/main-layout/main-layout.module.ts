import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutRoutes } from './main-layout.routing';
import { MainPageComponent } from '../../pages/main-page/main-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    MainPageComponent,
  ]
})

export class MainLayoutModule {}
