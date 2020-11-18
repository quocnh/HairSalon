import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const AppRoutes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'salonOwnerList',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/admin-layout/admin-layout.module#MainLayoutModule'
  //     }]
  // },
 
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
    path: '',
    component: MainLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: './layouts/main-layout/main-layout.module#MainLayoutModule' }
      ]
  },


]
