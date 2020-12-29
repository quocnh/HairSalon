import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { UserComponent } from 'app/pages/user/user.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { BecomeSalonownerComponent } from 'app/pages/become-salonowner/become-salonowner.component';


export const MainLayoutRoutes: Routes = [
    { path: '',                             component: MainPageComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
    { path: 'coords/:latitude/:longitude',              component: MainPageComponent},
    { path: 'location/:city/:district',              component: MainPageComponent},
    { path: 'become-salon-owner',               component: BecomeSalonownerComponent },
    { path: 'profile',               component: UserComponent },

];
