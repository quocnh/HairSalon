import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BecomeDistributorService } from 'app/_services/become-distributor.service';
import { BecomeSalonOwnerService } from 'app/_services/become-salon-owner.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-register-list-become-distributor',
  templateUrl: './register-list-become-distributor.component.html',
  styleUrls: ['./register-list-become-distributor.component.css']
})
export class RegisterListBecomeDistributorComponent implements OnInit {
  dbAddress: string;
  prefixPath: string;

  private roles: string[];
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;
  isAdmin = false;
  isSalonOwner = false;  

  becomeDistributorList: any;
  form: any = {};

  constructor(
    // private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    // private modalService: NgbModal,
    public becomeDistributorService: BecomeDistributorService,
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
      this.refreshBecomeDistributorList();
    }    
  }

  refreshBecomeDistributorList(){
    this.becomeDistributorService.getAllBecomeDistributor().subscribe(
      data => {
        console.log(data);
        this.becomeDistributorList = data;
      },
      err => {
      }
    );
  }

  accept(item){
    console.log(item);
    if (this.isAdmin) {
      this.form._id = item._id;
      this.form.username = item.username;
      this.form.email = item.email,
      this.form.phone = item.phone,
      this.form.firstname = item.firstname,
      this.form.lastname = item.lastname,

      this.becomeDistributorService.acceptBecomeDistributor(this.form).subscribe(
        () => {          
          this.refreshBecomeDistributorList();
        },
        err => {
        }
      );
    }
  }

  reject(item){
    console.log(item._id);
    if (this.isAdmin) {
      this.form._id = item._id;
      this.form.username = item.username;
      this.becomeDistributorService.rejectBecomeDistributor(item).subscribe(
        () => {          
          this.refreshBecomeDistributorList();
        },
        err => {
        }
      );
    }
  }

}
