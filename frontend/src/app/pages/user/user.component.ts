import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Customer from '../../module/customer';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { SearchService } from 'app/_services/search.service';

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

    keyword = 'name';
    initialCity:string='';
    initialDistrict:string='';
    cities:any[];
    districts:any[];
    selectedCity:any;
    selectedDistrict:any;

    constructor(
        private salonUtilService: SalonUtilsService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private calendar: NgbCalendar,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        private searchService: SearchService
        ) { }

    ngOnInit() {
        this.strAvatar = 'assets/img/default-avatar.png';
        this.searchService.getCities().then(cities => {
            this.cities = cities;
        });

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
            if (this.customer.city !== this.customerDb.city) {
            this.customer.city = this.selectedCity.name;
            }
            if (this.customer.district !== this.customerDb.district) {
            this.customer.district = this.selectedDistrict.name;
            }
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

    selectCityEvent(event) {
        // console.log(event);
        this.selectedCity = event;
        this.districts = event.district;
        this.customer.city = this.selectedCity.name;
        // console.log(this.salonOwner.city);
    }
    selectDistrictEvent(event) {
        // console.log(event);
        this.selectedDistrict = event;
        this.customer.district = this.selectedDistrict.name;
        // console.log(this.salonOwner.district);
    }
    onChangeSearch(event) {
        //console.log(event);

    }
    handleCityEmptyInput() {
        this.selectedCity = null;
    }
    handleDistrictEmptyInput() {
        this.selectedDistrict = null;
    }
    onFocused(event) {
        //console.log(event);
    }
}
