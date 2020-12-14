import { Routes } from '@angular/router';
import { UserComponent } from '../../pages/user/user.component';
import { ProductsListViewComponent } from 'app/pages/products-list-view/products-list-view.component';
import { ProductOrdersListViewComponent } from 'app/pages/product-orders-list-view/product-orders-list-view.component';
import { ProductDetailViewComponent } from 'app/pages/product-detail-view/product-detail-view.component';
import { ProductDetailEditComponent } from 'app/pages/product-detail-edit/product-detail-edit.component';
import SalonOwner from 'app/module/salonOwner';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { SalonOwnerProfileComponent } from 'app/pages/salon-owner-profile/salon-owner-profile.component';

export const DistributorLayoutRoutes: Routes = [
    
    { path: 'profile',           component: UserComponent },    
    { path: 'products',               component: ProductsListViewComponent },
    { path: 'products/:productId',               component: ProductDetailEditComponent },
    { path: 'orders',         component: ProductOrdersListViewComponent },
    { path: 'orders/products/:productId',         component: ProductDetailEditComponent },
    { path: 'orders/salonOwners/:salonOwnerId',         component: SalonOwnerProfileComponent },
];
