import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import SalonOwner from 'app/module/salonOwner';
import User from 'app/module/userAccount';
import { SalonUtilsService } from 'app/salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-salon-owner-profile',
  templateUrl: './salon-owner-profile.component.html',
  styleUrls: ['./salon-owner-profile.component.css']
})
export class SalonOwnerProfileComponent implements OnInit {
  salonOwner:User = new User();
  salonOwnerDb:User = new User();
  userId: string;
  strAvatar: any;
  genders = [
      {value: 'Nam'},
      {value: 'Nữ'},
      {value: 'Khác'}
  ];
  selectedFile: File = null;
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  username: string;
  user: any;
  isAdmin = false;
  isSalonOwner = false;
  isModifiedEnable = false;
  isDistributor = false;
  salonOwnerUserId:string;

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
      private tokenStorageService: TokenStorageService,
      private searchService: SearchService
      ) { }

  ngOnInit() {
      this.strAvatar = 'assets/img/default-avatar.png';
      this.searchService.getCities().then(cities => {
        this.cities = cities;
      });

      // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_SALON_OWNER') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
      this.isDistributor = this.user.roles.includes('ROLE_DISTRIBUTOR');
    } else {
      // Not login yet
      return;
    }
    //console.log(this.isSalonOwner);
    if (this.isSalonOwner) {
      this.salonUtilService.getSalonOwnerIdFromUserId(this.user.id).subscribe(
        (retOwnerId: string) => {
          this.salonOwnerUserId = retOwnerId;
          console.log(this.salonOwnerUserId);
          if (this.salonOwnerUserId) {
            this.refreshProfile(this.salonOwnerUserId);
          } else {
            console.log("Can't find salon Owner Id");
          }            
        }
      );
    } else if (this.isAdmin || this.isDistributor) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        if (params.salonOwnerId) {
          console.log(params.salonOwnerId);
          this.userId = params.salonOwnerId;
          this.refreshProfile(this.userId);
          return;
        }
      });
    }

  }

  selectCityEvent(event){
    // console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.salonOwner.city = this.selectedCity.name;
    // console.log(this.salonOwner.city);
  }
  selectDistrictEvent(event){
    // console.log(event);
    this.selectedDistrict = event;
    this.salonOwner.district = this.selectedDistrict.name;
    // console.log(this.salonOwner.district);
  }
  onChangeSearch(event){
    //console.log(event);
        
  }
  handleCityEmptyInput(){
    this.selectedCity = null;
  }
  handleDistrictEmptyInput(){
    this.selectedDistrict = null;
  }
  onFocused(event){
    //console.log(event);
  }

  updateProfile() {
    if ((JSON.stringify(this.salonOwnerDb) !== JSON.stringify(this.salonOwner)) || (this.selectedFile !== null)) {
        // console.log(this.salonOwner);
        if (this.salonOwner.city !== this.salonOwnerDb.city) {
          this.salonOwner.city = this.selectedCity.name;
        }
        if (this.salonOwner.district !== this.salonOwnerDb.district) {
          this.salonOwner.district = this.selectedDistrict.name;
        }
        // update user profile
        this.salonUtilService.updateUserProfile(this.salonOwner._id, this.salonOwner, this.selectedFile).subscribe(
            // refresh page
            (user:User) => {

              this.salonOwner = user;
              this.salonOwnerDb = user;
              this.initialCity = this.salonOwner.city;
              this.initialDistrict = this.salonOwner.district;
              if (this.salonOwner.avatar) {
                this.strAvatar = environment.dbAddress+ '/' + this.salonOwner.avatar;
              }
            }
        );

    }
  }

  refreshProfile(profileId) {
    this.salonUtilService.getUser(profileId).subscribe(
        (user: User) => {
            this.salonOwner = Object.assign({}, user[0]);
            this.initialCity = this.salonOwner.city;
            this.initialDistrict = this.salonOwner.district;
            this.salonOwnerDb = Object.assign({}, user[0]);
            if (this.salonOwner.avatar) {
                this.strAvatar = environment.dbAddress+ '/' + this.salonOwner.avatar;
            }
            console.log(this.salonOwnerDb);
            //this.modelDob = this.ngbDateParserFormatter.parse(this.salonOwner.dob);
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
