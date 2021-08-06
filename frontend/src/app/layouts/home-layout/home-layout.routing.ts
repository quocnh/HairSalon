import { Routes } from '@angular/router';
import { EmailForgetPasswordComponent } from 'app/pages/emailForgetPassword/emailForgetPassword.component';
import { EmailVerificationComponent } from 'app/pages/emailVerification/emailVerification.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { UserProfileComponent } from 'app/pages/userProfile/userProfile.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { SalonViewComponent } from '../../pages/salon-view/salon-view.component';

export const HomeLayoutRoutes: Routes = [
    { path: '',                             component: HomeComponent },
    { path: 'home',                         component: HomeComponent },
    { path: 'salons/:salonId',              component: SalonViewComponent},
    { path: 'profile',                      component: UserProfileComponent },
    { path: 'email/verification/:username/:encryptedData',           component: EmailVerificationComponent },
    { path: 'email/forgetPassword/:username/:encryptedData',         component: EmailForgetPasswordComponent },

];
