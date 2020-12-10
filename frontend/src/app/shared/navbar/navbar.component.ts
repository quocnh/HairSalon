import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ADMIN_ROUTES } from '../../sidebar/sidebar.component';
import { MANAGER_ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../../popup/register/register.component';
import { LoginComponent } from '../../popup/login/login.component';
import User from '../../module/user';
import { SalonUtilsService } from '../../salon-utils.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { environment } from 'environments/environment';


@Component({
  moduleId: module.id,
  // tslint:disable-next-line: component-selector
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;

  username: string;
  baseUrl: string;

  private listTitles: any[];
  // tslint:disable-next-line: member-ordering
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  userObject: User = new User();
  // tslint:disable-next-line: member-ordering
  public isCollapsed = true;
  // tslint:disable-next-line: member-ordering
  @ViewChild('navbar-cmp', { static: false }) button;

  // tslint:disable-next-line: member-ordering
  constructor(
    private tokenStorageService: TokenStorageService,
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private salonUtilService: SalonUtilsService,) {

    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

  }

  // tslint:disable-next-line: member-ordering
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    console.log(this.baseUrl);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showSalonOwnerBoard = this.roles.includes('ROLE_SALONOWNER') || this.roles.includes('ROLE_ADMIN');
      this.showDistributorBoard = this.roles.includes('ROLE_DISTRIBUTOR') || this.roles.includes('ROLE_ADMIN');
            
      this.username = user.username;
    }
//------------
    if (this.router.url.startsWith('/manager')) {
      this.listTitles = MANAGER_ROUTES.filter(menuItem => menuItem);
    } else {
      this.listTitles = ADMIN_ROUTES.filter(menuItem => menuItem);
    }
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe(() => {
      this.sidebarClose();
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // call signin modal function
  login() {
    console.log('call login modal');
    const ref = this.modalService.open(LoginComponent);
    ref.result.then((result) => {
      // if (result) {
      //   console.log("navbar gets model info: " + result);

      // }
    },
      (cancel) => {
        console.log('cancel click');
      })
  }
  // call signup modal function
  register() {
    console.log('call register modal');
    const ref = this.modalService.open(RegisterComponent);
    ref.componentInstance.role = 'customer';
    ref.result.then((result) => {
      // if (result) {
      //   console.log("Result from login modal: ", result.email + result.password);
      //   this.userObject.email = result.email;
      //   this.userObject.password = result.password;
      //   console.log("xx: " + this.userObject);
      //   this.salonUtilService.callRegisterAPI(this.userObject).subscribe();
      // }
    },
      (cancel) => {
        console.log('cancel click');
      })
  }
  // tslint:disable-next-line: member-ordering
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'HairSalon';
  }
  // tslint:disable-next-line: member-ordering
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  // tslint:disable-next-line: member-ordering
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  // tslint:disable-next-line: member-ordering
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  // tslint:disable-next-line: member-ordering
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

}
