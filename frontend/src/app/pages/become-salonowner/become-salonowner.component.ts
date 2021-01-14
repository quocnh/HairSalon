import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Customer from 'app/module/customer';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { BecomeSalonOwnerService } from '../../_services/become-salon-owner.service';
@Component({
  selector: 'app-become-salonowner',
  templateUrl: './become-salonowner.component.html',
  styleUrls: ['./become-salonowner.component.css']
})
export class BecomeSalonownerComponent implements OnInit {
  form: any = {};
  customer: Customer;

  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  username: string;
  user: any;
  isAdmin = false;
  isSalonOwner = false;

  
  constructor(
    public becomeSalonOwnerService: BecomeSalonOwnerService,
    private salonUtilService: SalonUtilsService,
    // private route: ActivatedRoute,
    private router: Router,
    // private modalService: NgbModal,
    private tokenStorageService: TokenStorageService
    ) { }


  ngOnInit(): void {
    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      //this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }

    console.log('USER ID:');
    console.log(this.user.id);
    // 2. Get distributorId
    this.salonUtilService.getOneCustomerFromUserId(this.user.id).subscribe(
      (customers: Customer[]) => {        
        this.customer = Object.assign({}, customers[0]);
        this.form.userId = this.user.id;
        this.form.username = this.customer.username;
        this.form.firstname = this.customer.firstname;
        this.form.lastname = this.customer.lastname;
        this.form.phone = this.customer.phone;
        this.form.email = this.customer.email;
        this.form.city = this.customer.city;
        this.form.district = this.customer.district;
        this.form.address = this.customer.address;
      }
    );
  }  

  onSubmit() { 
    console.log("test submit form"); 
    this.becomeSalonOwnerService.creatBecomeSalonOwner(this.form).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home']);
      },
      err => {
        console.log("Already applied !!!");
        this.router.navigate(['home']);
      }
    );
  }
}
