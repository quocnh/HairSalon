import { Routes } from '@angular/router';
import { MainPageComponent } from '../../pages/main-page/main-page.component';
import { LoginComponent } from '../../pages/login/login.component';
export const MainLayoutRoutes: Routes = [
    { path: '',                 component: MainPageComponent },
    { path: 'main',             component: MainPageComponent },
    { path: 'login',             component: LoginComponent },
];
