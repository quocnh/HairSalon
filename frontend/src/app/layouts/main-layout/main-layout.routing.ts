import { Routes } from '@angular/router';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';

export const MainLayoutRoutes: Routes = [
    { path: '',                             component: MainPageComponent },
    { path: 'home',                         component: MainPageComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
];
