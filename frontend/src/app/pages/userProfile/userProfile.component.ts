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
    modelDob: NgbDateStruct ;
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
    isDistributor = false;

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
            this.isDistributor = this.currentUser.roles.includes('ROLE_DISTRIBUTOR');
            this.userId = this.currentUser.id;
        } else {
            // Not login yet
            return;
        }

        this.strAvatar = 'assets/img/default-avatar.png';
        this.searchService.getCities().then(cities => {
            this.cities = cities;
        });


        this.route.params.subscribe((params: Params) => {
            if(params.userId){
                this.userId = params.userId;
            } else if (params.distributorId) {
                this.userId = params.distributorId;
            } else if (params.salonOwnerId) {
                this.userId = params.salonOwnerId;                
            }

            if (this.userId) {
                this.refreshUserProfile(this.userId);
            }
            
            
        });

        

        

    }   

    updateUserProfile() {
        if (JSON.stringify(this.userDb) !== JSON.stringify(this.user)) {
            // console.log('Khac' + JSON.stringify(this.userDb) + '---' + JSON.stringify(this.user));
            if (this.user.city !== this.userDb.city) {
            this.user.city = this.selectedCity.name;
            }
            if (this.user.district !== this.userDb.district) {
            this.user.district = this.selectedDistrict.name;
            }
            if(this.modelDob === undefined){
                this.user.dob = new Date(1980, 1, 1, 0, 0, 0, 0);
            } else {
                this.user.dob = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);
            }
            
            // update user profile
            this.salonUtilService.updateUserProfile(this.userId, this.user).subscribe(
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
                //console.log(user);
                this.user = Object.assign({}, user[0]);
                this.userDb = Object.assign({}, user[0]);
                // console.log(this.user.avatar);
                if ((this.user.avatar !== 'null') && (this.user.avatar !== undefined)){
                    this.strAvatar = this.user.avatar;
                }
                if (this.user.dob !== undefined){
                    this.modelDob = this.ngbDateParserFormatter.parse(this.user.dob.toString());
                }
                
            });
    }

    // onFileSelected(event) {
    //     this.selectedFile = event.target.files[0];

    //     const reader = new FileReader();
    //     reader.readAsDataURL(this.selectedFile);
    //     reader.onload = (_event) => {
    //         this.strAvatar = reader.result;
    //     }
    //     console.log(this.selectedFile);
    // }

    onFileSelected(event) {
        var resizedImage;
        this.selectedFile = event.target.files[0];
        // Ensure it's an image
        if (this.selectedFile.type.match(/image.*/)) {
          console.log('An image has been loaded');
    
          // Load the image
          var reader = new FileReader();
          reader.onload = (_event) => {
            var image = new Image();
            image.src = URL.createObjectURL(this.selectedFile);
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
              //console.log(resizedImage);
              this.user.avatar = this.strAvatar;
            }
    
          }
          reader.readAsDataURL(this.selectedFile);
        }
    }
    
    //   resizeAndLoadImage(target, imageFile) {
    
    //   }
    
    //   onFileModifyServiceImage(event, idx) {
    
    //     var resizedImage;
    //     var file = event.target.files[0];
    //     // Ensure it's an image
    //     if (file.type.match(/image.*/)) {
    //       console.log('An image has been loaded');
    
    //       // Load the image
    //       var reader = new FileReader();
    //       reader.onload = (_event) => {
    //         var image = new Image();
    //         image.src = URL.createObjectURL(file);
    //         image.onload = (imageEvent) => {
    //           // //TODO: limit size 300x300 ~ 30Kb
    //           var canvas = document.createElement('canvas'),
    //             max_size = 300,
    //             width = image.width,
    //             height = image.height;
    //           if (width > max_size) {
    //             width = max_size;
    //           }
    //           if (height > max_size) {
    //             height = max_size;
    //           }
    //           canvas.width = width;
    //           canvas.height = height;
    //           canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    //           resizedImage = canvas.toDataURL('image/jpeg');
    
    //           this.salon.services[idx].image = resizedImage;
    //           //console.log(resizedImage);
    //         }
    
    //       }
    //       reader.readAsDataURL(file);
    //     }
    //   }


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
