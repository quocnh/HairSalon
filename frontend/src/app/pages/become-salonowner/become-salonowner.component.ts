import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'app/module/userAccount';
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
  // customer: Customer;
  user:User = new User();

  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  username: string;
  currentUser: any;
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
      this.currentUser = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.currentUser.roles);
      //this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.currentUser.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.currentUser.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      this.router.navigate(['home']);
    }

    if (this.isSalonOwner) {
      this.router.navigate(['home']);
    }
    console.log('USER ID:');
    console.log(this.currentUser.id);
    // 2. Get Customer info
    this.salonUtilService.getUser(this.currentUser.id).subscribe(
      (users: User[]) => {        
        this.user = Object.assign({}, users[0]);
        this.form.userId = this.user._id;
        this.form.username = this.user.username;
        this.form.firstname = this.user.firstname;
        this.form.lastname = this.user.lastname;
        this.form.phone = this.user.phone;
        this.form.email = this.user.email;
        this.form.city = this.user.city;
        this.form.district = this.user.district;
        this.form.address = this.user.address;
      }
    );
  }  

  onSubmit() { 
    console.log("test submit form"); 
    this.becomeSalonOwnerService.createBecomeSalonOwner(this.form).subscribe(
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
