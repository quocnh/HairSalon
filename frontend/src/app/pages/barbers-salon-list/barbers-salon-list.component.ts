import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from 'app/module/salon';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
  selector: 'app-barbers-salon-list',
  templateUrl: './barbers-salon-list.component.html',
  styleUrls: ['./barbers-salon-list.component.css']
})
export class BarbersSalonListComponent implements OnInit {

  
  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  addedSalon: Salon = new Salon();
  prefixPath: string;

  isLoggedIn = false;
  user: any;
  isSalonOwner = false;
  salonId: string;

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {

    //Get ownerId from login page
    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }

    if(this.isSalonOwner) {
      this.refreshSalonList(this.user.id);
    }

    this.isListAllSalons = false;

    this.prefixPath = this.router.url;
    //console.log(this.prefixPath);
    /*
    this.route.params.subscribe((param: Params) => {
      this.ownerId = param.ownerId;
      if (!this.ownerId) {
        this.isListAllSalons = true;
        this.refreshAllSalonList();
      } else {
        this.refreshSalonList();
        this.isListAllSalons = false;
      }
    });
    */
  }

  refreshSalonList(userId) {
    console.log(userId);
    this.salonUtilService.getSalonOwnerIdFromUserId(userId).subscribe(salonOwnerId=> {
      console.log(salonOwnerId);
      this.salonUtilService.getSalonsFromOwnerId(salonOwnerId).subscribe((salons: Salon[]) => this.salons = salons);
    });
    
  }


}
