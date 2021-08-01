import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import User from 'app/module/userAccount';
import { SalonUtilsService } from 'app/salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-distributor-profile',
  templateUrl: './distributor-profile.component.html',
  styleUrls: ['./distributor-profile.component.css']
})
export class DistributorProfileComponent implements OnInit {
  distributor:User = new User();
  distributorDb:User = new User();
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
  isDistributor = false;
  isModifiedEnable = false;
  isSalonOwner = false;
  distributorId:string;
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
      //console.log(this.cities);
    });

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isDistributor = this.user.roles.includes('ROLE_DISTRIBUTOR');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }

    if (this.isDistributor) {
      this.salonUtilService.getDistributorIdFromUserId(this.user.id).subscribe(
        (retId: string) => {
          this.distributorId = retId;
          console.log(this.distributorId);
          if (this.distributorId) {
            this.refreshProfile(this.distributorId);
          } else {
            console.log("Can't find distributor Id");
          }            
        }
      );
    } else if (this.isAdmin || this.isSalonOwner) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        if (params.distributorId) {
          console.log(params.distributorId);
          this.userId = params.distributorId;
          this.refreshProfile(this.userId);
          return;
        }
      });
    }
    
  }

  updateProfile() {
    if ((JSON.stringify(this.distributorDb) !== JSON.stringify(this.distributor)) || (this.selectedFile !== null)) {
        //console.log(this.salonOwner);
        if (this.distributor.city !== this.distributorDb.city) {
          this.distributor.city = this.selectedCity.name;
        }
        if (this.distributor.district !== this.distributorDb.district) {
          this.distributor.district = this.selectedDistrict.name;
        }
        // update user profile
        this.salonUtilService.updateUserProfile(this.distributor._id, this.distributor).subscribe(
            // refresh page
            (distributor:Distributor) => this.refreshProfile(distributor._id)
        );

    }
  }

  refreshProfile(profileId) {
    this.salonUtilService.getUser(profileId).subscribe(
        (user: User) => {
            this.distributor = Object.assign({}, user[0]);
            this.distributorDb = Object.assign({}, user[0]);
            if (this.distributor.avatar) {
                this.strAvatar = this.distributor.avatar;
            }
            //console.log(this.salonOwnerDb);
            //this.modelDob = this.ngbDateParserFormatter.parse(this.salonOwner.dob);
        });

  }

  onFileSelected(event) {
    var resizedImage;
    var file = event.target.files[0];
    // Ensure it's an image
    if (file.type.match(/image.*/)) {
      console.log('An image has been loaded');

      // Load the image
      var reader = new FileReader();
      reader.onload = (_event) => {
        var image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = (imageEvent) => {
          // //TODO: limit size 300x300 ~ 30Kb
          var canvas = document.createElement('canvas'),
            max_size = 300,
            width = image.width,
            height = image.height;
          if (width > max_size) {
            width = max_size;
          }
          if (height > max_size) {
            height = max_size;
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          resizedImage = canvas.toDataURL('image/jpeg');

          this.strAvatar = resizedImage;
          this.distributor.avatar = this.strAvatar;
          //console.log(resizedImage);
        }

      }
      reader.readAsDataURL(file);
    }
}

  selectCityEvent(event){
    // console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.distributor.city = this.selectedCity.name;
    // console.log(this.salonOwner.city);
  }
  selectDistrictEvent(event){
    // console.log(event);
    this.selectedDistrict = event;
    this.distributor.district = this.selectedDistrict.name;
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
}
