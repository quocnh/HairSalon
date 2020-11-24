import { Routes } from '@angular/router';
import { UserComponent } from '../../pages/user/user.component';
import { ProductsListViewComponent } from 'app/pages/products-list-view/products-list-view.component';
import { ProductOrdersListViewComponent } from 'app/pages/product-orders-list-view/product-orders-list-view.component';

export const DistributorLayoutRoutes: Routes = [

    { path: '',      component: ProductsListViewComponent },
    { path: 'profile',           component: UserComponent },    
    { path: 'products',               component: ProductsListViewComponent },
    { path: 'orders',         component: ProductOrdersListViewComponent },
];
