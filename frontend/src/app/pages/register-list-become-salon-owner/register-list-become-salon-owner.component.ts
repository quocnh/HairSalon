import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'app/module/global-constants';
import { BecomeSalonOwnerService } from 'app/_services/become-salon-owner.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-register-list-become-salon-owner',
  templateUrl: './register-list-become-salon-owner.component.html',
  styleUrls: ['./register-list-become-salon-owner.component.css']
})
export class RegisterListBecomeSalonOwnerComponent implements OnInit {
  dbAddress: string;
  prefixPath: string;

  private roles: string[];
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;
  isAdmin = false;
  isSalonOwner = false;
  pOrders:any; //QUOC need to fix it

  becomeSalonOwnerList_waiting: any = new Array();
  becomeSalonOwnerList_accept: any = new Array();
  becomeSalonOwnerList_reject: any = new Array();
  form: any = {};

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
      this.refreshBecomeSalonOwnerList();
    }    
  }
  refreshBecomeSalonOwnerList(){
    this.becomeSalonOwnerList_waiting = [];
    this.becomeSalonOwnerList_accept = [];
    this.becomeSalonOwnerList_reject = [];

    this.becomeSalonOwnerService.getAllBecomeSalonOwner().subscribe(
      data => {
        // console.log(data);
        for (var i = 0; i < data.length; i++){
          if (data[i].status == GlobalConstants.ApplicationRequestStatus[0]) {
            this.becomeSalonOwnerList_waiting.push(data[i]);
          } else if (data[i].status == GlobalConstants.ApplicationRequestStatus[1]) {
            this.becomeSalonOwnerList_accept.push(data[i]);
          } else {
            this.becomeSalonOwnerList_reject.push(data[i]);
          }
        }        
      },
      err => {
      }
    );
  }

  accept(bsoItem){
    console.log(bsoItem);
    if (this.isAdmin) {
      this.form._id = bsoItem._id;
      this.form.username = bsoItem.username;
      this.form.email = bsoItem.email,
      this.form.phone = bsoItem.phone,
      this.form.firstname = bsoItem.firstname,
      this.form.lastname = bsoItem.lastname,

      this.becomeSalonOwnerService.acceptBecomeSalonOwner(this.form).subscribe(
        () => {          
          this.refreshBecomeSalonOwnerList();
        },
        err => {
        }
      );
    }
  }

  reject(bsoItem){
    console.log(bsoItem._id);
    if (this.isAdmin) {
      this.form._id = bsoItem._id;
      this.form.username = bsoItem.username;
      this.becomeSalonOwnerService.rejectBecomeSalonOwner(bsoItem).subscribe(
        () => {          
          this.refreshBecomeSalonOwnerList();
        },
        err => {
        }
      );
    }
  }

}
