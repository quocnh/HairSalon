import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Customer from '../../module/customer';

@Component({
    selector: 'app-user-profile',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    userId: string;
    customerDb: Customer = new Customer();
    customer: Customer = new Customer();
    genders = [
        {value: 'Nam'},
        {value: 'Nữ'},
        {value: 'Khác'}
      ];

    constructor(
        private salonUtilService: SalonUtilsService,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.route.params.subscribe((param: Params) => {
            this.userId = param.userId;
            if (this.userId) {
              this.refreshUserProfile(this.userId);
            }
          });
    }

    updateCustomerProfile() {
        if (JSON.stringify(this.customerDb) === JSON.stringify(this.customer)) {
            console.log('Giong' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
        } else {
            console.log('Khac' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
            this.salonUtilService.updateCustomer(this.userId, this.customer).subscribe();
            this.refreshUserProfile(this.userId);
        }
      }

    refreshUserProfile(profileId) {
        this.salonUtilService.getOneCustomer(profileId).subscribe(
            (customer: Customer) => {
                this.customer = Object.assign({}, customer[0]);
                this.customerDb = Object.assign({}, customer[0]);
            });
      }
}
