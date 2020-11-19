
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ADMIN_ROUTES: RouteInfo[] = [
    { path: 'dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: 'icons',         title: 'Icons',             icon: 'nc-diamond',    class: '' },
    { path: 'maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
    { path: 'notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },    
    { path: 'table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    { path: 'typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    { path: 'profile',          title: 'Thông tin cá nhân',      icon: 'nc-circle-10',  class: '' },
    { path: 'salonOwnersList',     title: 'Danh sách chủ salon',           icon: 'nc-single-02',   class: '' },
    { path: 'customersList',       title: 'Danh sách khách hàng',          icon: 'nc-single-02',   class: '' },
    { path: 'salons',              title: 'Danh sách salon',               icon: 'nc-shop',   class: '' },
    { path: 'distributors',        title: 'Nhà phân phối',       icon: 'nc-delivery-fast',   class: '' },
    { path: 'barbers',             title: 'Thợ cắt tóc',         icon: 'nc-badge',   class: '' },
];

export const MANAGER_ROUTES: RouteInfo[] = [    
    { path: 'profile',          title: 'Thông tin cá nhân',      icon: 'nc-circle-10',  class: '' },
    { path: 'salons',              title: 'Danh sách salon',               icon: 'nc-shop',   class: '' },
    { path: 'distributors',        title: 'Nhà phân phối',       icon: 'nc-delivery-fast',   class: '' },
    { path: 'barbers',             title: 'Thợ cắt tóc',         icon: 'nc-badge',   class: '' },
    { path: 'bookings',             title: 'Lịch hẹn',         icon: 'nc-calendar-60',   class: '' },
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
        } else {
            this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
        }        
    }
}
