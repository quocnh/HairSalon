import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DistributorLayoutComponent } from './layouts/distributor-layout/distributor-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SalonsListViewComponent } from './pages/salons-list-view/salons-list-view.component';
import { ProductsListViewComponent } from './pages/products-list-view/products-list-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },

  {
    path: 'manager',
    component: ManagerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/manager-layout/manager-layout.module#ManagerLayoutModule'
      }]
  },

  {
    path: 'distributor',
    component: DistributorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/distributor-layout/distributor-layout.module#DistributorLayoutModule'
      }]
  },

  // {
  //   path: 'home',
  //   component: MainLayoutComponent,
  //   // children: [
  //   //   {
  //   //     path: '',
  //   //     loadChildren: './layouts/main-layout/main-layout.module#MainLayoutModule'
  //   //   }
  //   // ]
  // },


  { path: 'home', component: MainPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'manager', component: SalonsListViewComponent },
  { path: 'distributor', component: ProductsListViewComponent },
  { path: 'admin', component: DashboardComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }