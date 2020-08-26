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
    userId: String;
    customer: Customer = new Customer();

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
    refreshUserProfile(profileId) {
        this.salonUtilService.getOneCustomer(profileId).subscribe(
            (customer: Customer) => {
                this.customer = customer[0];
            });
      }
}
