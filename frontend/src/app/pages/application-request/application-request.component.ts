import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { BecomeSalonOwnerService } from '../../_services/become-salon-owner.service';
import BecomeSalonOwner from 'app/module/becomeSalonOwner';
@Component({
  selector: 'app-application-request',
  templateUrl: './application-request.component.html',
  styleUrls: ['./application-request.component.css']
})
export class ApplicationRequestComponent implements OnInit {
  dbAddress: string;
  prefixPath: string;

  private roles: string[];
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;
  isAdmin = false;
  isSalonOwner = false;
  pOrders:any; //QUOC need to fix it

  becomeSalonOwnerList: any;

  constructor(
    // private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    // private modalService: NgbModal,
    public becomeSalonOwnerService: BecomeSalonOwnerService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.dbAddress = environment.dbAddress;

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_ADMIN');
      // this.distributorId = this.user.id;
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }
    

    if (this.isAdmin) {
      this.becomeSalonOwnerService.getAllBecomeSalonOwner().subscribe(
        data => {
          console.log(data);
          this.becomeSalonOwnerList = data;
        },
        err => {
        }
      );
      // this.route.params.subscribe((params: Params) => {
      //   console.log("Test ADMIN:", this.user.id);
      //   if (params.distributorId) {
      //     // For admin controller
      //     // this.distributorId = params.distributorId;        
      //     // this.refreshOrderProductsList();
      //     return;
      //   }

      // });
    } else {
      return;
    }
    this.prefixPath = environment.baseUrl + this.router.url;    

    console.log(this.prefixPath);
    
  }

}
