import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Customer from '../../module/customer';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-user-profile',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    userId: string;
    customerDb: Customer = new Customer();
    customer: Customer = new Customer();
    strAvatar: any;
    genders = [
        {value: 'Nam'},
        {value: 'Nữ'},
        {value: 'Khác'}
    ];
    selectedFile: File = null;
    modelDob: NgbDateStruct;
    today = this.calendar.getToday();

    constructor(
        private salonUtilService: SalonUtilsService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private calendar: NgbCalendar,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        ) { }

    ngOnInit() {
        this.strAvatar = 'assets/img/default-avatar.png';
        this.route.params.subscribe((params: Params) => {
            this.userId = params.userId;
            if (this.userId) {
                this.refreshUserProfile(this.userId);
            }
          });

    }

    updateCustomerProfile() {
        if ((JSON.stringify(this.customerDb) !== JSON.stringify(this.customer)) || (this.selectedFile !== null)) {
            // console.log('Khac' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
            // update user profile
            this.salonUtilService.updateCustomer(this.userId, this.customer, this.selectedFile).subscribe(
                // refresh page
                () => this.refreshUserProfile(this.userId)
            );

        } else {
            // console.log('Giong' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
        }
      }

    refreshUserProfile(profileId) {
        this.salonUtilService.getOneCustomer(profileId).subscribe(
            (customer: Customer) => {
                this.customer = Object.assign({}, customer[0]);
                this.customerDb = Object.assign({}, customer[0]);
                if (this.customer.avatar) {
                    this.strAvatar = environment.dbAddress+ '/' + this.customer.avatar;
                }
                console.log(this.strAvatar);
                this.modelDob = this.ngbDateParserFormatter.parse(this.customer.dob);
            });

    }

    onFileSelected(event) {
        this.selectedFile = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = (_event) => {
            this.strAvatar = reader.result;
        }
        console.log(this.selectedFile);
    }
}
