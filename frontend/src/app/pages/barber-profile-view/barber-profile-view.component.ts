import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { GlobalConstants } from 'app/module/global-constants';

@Component({
  selector: 'app-barber-profile-view',
  templateUrl: './barber-profile-view.component.html',
  styleUrls: ['./barber-profile-view.component.css']
})
export class BarberProfileViewComponent implements OnInit {
  barberId: string;
  barberDb: Barber = new Barber();
  barber: Barber = new Barber();
  strAvatar: any;
  salonName: string;
  genders = GlobalConstants.Genders;
  
  selectedFile: File = null;
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();

  isLoggedIn = false;
  user: any;
  isAdmin = false;
  isModifiedEnable = false;

  constructor(
      private salonUtilService: SalonUtilsService,
      private route: ActivatedRoute,
      private http: HttpClient,
      private calendar: NgbCalendar,
      private ngbDateParserFormatter: NgbDateParserFormatter,
      private tokenStorageService: TokenStorageService
      ) { }

  ngOnInit() {
      this.strAvatar = 'assets/img/default-avatar.png';


      // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
    } else {
      // Not login yet
      return;
    }
    //console.log(this.isSalonOwner);
    
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      if (params.barberId) {
        this.barberId = params.barberId;
        this.refreshUserProfile(this.barberId);
        return;
      }
    });


    // 2. Get barberId
    this.salonUtilService.getBarberIdFromUserId(this.user.id).subscribe(
      (retId: string) => {
        this.barberId = retId;
        console.log(this.barberId);
        if (this.barberId) {
            this.isModifiedEnable = true;
            this.refreshUserProfile(this.barberId);
        } else {
          console.log("Can't find barber Id");
        }            
      }
    );

  }

  updateUserProfile() {
      if ((JSON.stringify(this.barberDb) !== JSON.stringify(this.barber)) || (this.selectedFile !== null)) {
          // console.log('Khac' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
          // update user profile
          this.salonUtilService.updateBarber(this.barberId, this.barber, this.selectedFile).subscribe(
              () => // refresh page
              this.refreshUserProfile(this.barberId)
          );
      } else {
          // console.log('Giong' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
      }
    }

  refreshUserProfile(profileId) {
      this.salonUtilService.getOneBarber(profileId).subscribe(
          (user: Barber) => {
              this.barber = Object.assign({}, user[0]);
              this.barberDb = Object.assign({}, user[0]);
              if (this.barber.avatar) {
                  this.strAvatar = environment.dbAddress + '/' + this.barber.avatar;
              }
              console.log(this.strAvatar);
              this.modelDob = this.ngbDateParserFormatter.parse(this.barber.dob);

              // get salon name from salon Id
              console.log(this.barber._salonId);
              if (this.barber._salonId) {
                this.salonUtilService.getOneSalon(this.barber._salonId).subscribe(
                  (salon: Salon) => {
                      this.salonName = salon[0].name;
                      console.log(this.salonName);
                  });
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
}
