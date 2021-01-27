import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { SearchService } from 'app/_services/search.service';
import { GlobalConstants } from 'app/module/global-constants';
import User from 'app/module/userAccount';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
    selector: 'app-user-profile',
    moduleId: module.id,
    templateUrl: 'userProfile.component.html'
})

export class UserProfileComponent implements OnInit {
    userId: string;
    userDb: User = new User();
    user: User = new User();

    strAvatar: any;
    genders = GlobalConstants.Genders;

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

    isLoggedIn = false;
    showAdminBoard = false;
    showSalonOwnerBoard = false;
    showDistributorBoard = false;
    username: string;
    currentUser: any;
    isAdmin = false;
    isSalonOwner = false;
    isDustributor = false;

    constructor(
        private salonUtilService: SalonUtilsService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private calendar: NgbCalendar,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        private searchService: SearchService,
        private tokenStorageService: TokenStorageService
        ) { }

    ngOnInit() {
        // 1. Get userId
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {      
            this.currentUser = this.tokenStorageService.getUser();
            console.log('LOGGED IN:' +  this.currentUser.roles);
            //this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
            this.isAdmin = this.currentUser.roles.includes('ROLE_ADMIN');
            this.isSalonOwner = this.currentUser.roles.includes('ROLE_SALON_OWNER');
            this.isDustributor = this.currentUser.roles.includes('ROLE_DISTRIBUTOR');
            this.userId = this.currentUser.id;
        } else {
            // Not login yet
            return;
        }

        this.strAvatar = 'assets/img/default-avatar.png';
        this.searchService.getCities().then(cities => {
            this.cities = cities;
        });

        if(this.isAdmin){
            this.route.params.subscribe((params: Params) => {
                this.userId = params.userId;
                if (this.userId) {
                    this.refreshUserProfile(this.userId);
                }
              });
        } else {
            if (this.userId) {
                this.refreshUserProfile(this.userId);
            }
        }
        

    }   

    updateUserProfile() {
        if ((JSON.stringify(this.userDb) !== JSON.stringify(this.user)) || (this.selectedFile !== null)) {
            // console.log('Khac' + JSON.stringify(this.userDb) + '---' + JSON.stringify(this.user));
            if (this.user.city !== this.userDb.city) {
            this.user.city = this.selectedCity.name;
            }
            if (this.user.district !== this.userDb.district) {
            this.user.district = this.selectedDistrict.name;
            }
            this.user.dob = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);
            // update user profile
            this.salonUtilService.updateUserProfile(this.userId, this.user, this.selectedFile).subscribe(
                // refresh page
                () => {
                    this.refreshUserProfile(this.userId);
                    this.selectedFile = null;
                }
            );

        } else {
            // console.log('Giong' + JSON.stringify(this.userDb) + '---' + JSON.stringify(this.user));
        }
      }

    refreshUserProfile(userId) {
        this.salonUtilService.getUser(userId).subscribe(
            (user: User) => {
                // console.log(user);
                this.user = Object.assign({}, user[0]);
                this.userDb = Object.assign({}, user[0]);
                // console.log(this.user.avatar);
                if ((this.user.avatar !== 'null') && (this.user.avatar !== undefined)){
                    this.strAvatar = environment.dbAddress+ '/' + this.user.avatar;
                }
                if (this.user.dob !== undefined){
                    this.modelDob = this.ngbDateParserFormatter.parse(this.user.dob.toString());
                }
                
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
        this.user.city = this.selectedCity.name;
        // console.log(this.salonOwner.city);
    }
    selectDistrictEvent(event) {
        // console.log(event);
        this.selectedDistrict = event;
        this.user.district = this.selectedDistrict.name;
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
