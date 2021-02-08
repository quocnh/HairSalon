
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ADMIN_ROUTES: RouteInfo[] = [
    // { path: 'dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    // { path: 'icons',         title: 'Icons',             icon: 'nc-icon nc-diamond',    class: '' },
    { path: 'maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
    // { path: 'notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },    
    // { path: 'table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    // { path: 'typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    // { path: 'profile',          title: 'Thông tin cá nhân',      icon: 'nc-circle-10',  class: '' },
    { path: 'salonOwners',     title: 'Danh sách chủ salon',           icon: 'nc-icon nc-single-02',   class: '' },
    { path: 'customers',       title: 'Danh sách khách hàng',          icon: 'nc-icon nc-single-02',   class: '' },
    { path: 'salons',              title: 'Danh sách salon',               icon: 'nc-icon nc-shop',   class: '' },
    { path: 'distributors',        title: 'Nhà phân phối',       icon: 'nc-icon nc-delivery-fast',   class: '' },
    { path: 'barbers',             title: 'Thợ cắt tóc',         icon: 'nc-icon nc-badge',   class: '' },
    { path: 'become-salonowner-request',             title: 'Đơn đăng ký Salon',         icon: 'nc-icon nc-paper',   class: '' },
    { path: 'become-distributor-request',             title: 'Đơn đăng ký Nhà phân phối',         icon: 'nc-icon nc-paper',   class: '' },
];

export const MANAGER_ROUTES: RouteInfo[] = [    
    { path: 'profile',          title: 'Thông tin cá nhân',      icon: 'nc-icon nc-circle-10',  class: '' },
    { path: 'salons',              title: 'Danh sách salon',               icon: 'nc-icon nc-shop',   class: '' },
    { path: 'distributors',        title: 'Nhà phân phối',       icon: 'nc-icon nc-delivery-fast',   class: '' },
    { path: 'barbers',             title: 'Thợ cắt tóc',         icon: 'nc-icon nc-badge',   class: '' },
    { path: 'bookings',             title: 'Lịch hẹn',         icon: 'nc-icon nc-calendar-60',   class: '' },
];

export const DISTRIBUTOR_ROUTES: RouteInfo[] = [    
    { path: 'profile',          title: 'Thông tin công ty',      icon: 'nc-icon nc-circle-10',  class: '' },
    { path: 'products',              title: 'Danh sách sản phẩm',               icon: 'nc-icon nc-tag-content',   class: '' },    
    { path: 'orders',             title: 'Đơn hàng',         icon: 'nc-icon nc-paper',   class: '' },
];

@Component({
    moduleId: module.id,
    // tslint:disable-next-line: component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private router: Router) {}
    ngOnInit() {
        if(this.router.url.startsWith('/manager')){
            this.menuItems = MANAGER_ROUTES.filter(menuItem => menuItem);
        }else if(this.router.url.startsWith('/distributor')){
            this.menuItems = DISTRIBUTOR_ROUTES.filter(menuItem => menuItem);
        } else {
            this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
        }        
    }
}
