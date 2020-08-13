
import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon: 'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon: 'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    { path: '/salonOwnersList',     title: 'Danh sách chủ salon',           icon: 'nc-scissors',   class: '' },
    { path: '/customersList',       title: 'Danh sách khách hàng',          icon: 'nc-scissors',   class: '' },
    { path: '/salons',              title: 'Danh sách salon',               icon: 'nc-scissors',   class: '' },
    { path: '/distributors',        title: 'Danh sách nhà phân phối',       icon: 'nc-scissors',   class: '' },
    { path: '/main',                title: 'Main Page',                     icon: 'nc-scissors',   class: '' },
];

@Component({
    moduleId: module.id,
    // tslint:disable-next-line: component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
