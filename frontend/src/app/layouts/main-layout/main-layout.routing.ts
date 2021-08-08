import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { UserProfileComponent } from 'app/pages/userProfile/userProfile.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';
import { BecomeSalonownerComponent } from 'app/pages/become-salonowner/become-salonowner.component';
import { BecomeDistributorComponent } from 'app/pages/become-distributor/become-distributor.component';
import { HistoryBookingsListViewComponent } from 'app/pages/history-bookings-list-view/history-bookings-list-view.component';


export const MainLayoutRoutes: Routes = [
    { path: '',                             component: MainPageComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
    { path: 'coords/:latitude/:longitude',              component: MainPageComponent},
    { path: 'location/:city/:district',              component: MainPageComponent},
    { path: 'become-salon-owner',               component: BecomeSalonownerComponent },
    { path: 'become-distributor',               component: BecomeDistributorComponent },
    { path: 'profile',               component: UserProfileComponent },
    { path: 'history/:userId',                      component: HistoryBookingsListViewComponent },

];
