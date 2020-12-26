import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { UserComponent } from 'app/pages/user/user.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';


export const MainLayoutRoutes: Routes = [
    { path: '',                             component: MainPageComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
    { path: 'coords/:latitude/:longitude',              component: MainPageComponent},
    { path: 'profile',               component: UserComponent },

];
