import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { BecomeSalonownerComponent } from 'app/pages/become-salonowner/become-salonowner.component';

export const HomeLayoutRoutes: Routes = [
    { path: '',                             component: HomeComponent },
    { path: 'home',                         component: HomeComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
    { path: 'become-salon-owner',               component: BecomeSalonownerComponent },
];
