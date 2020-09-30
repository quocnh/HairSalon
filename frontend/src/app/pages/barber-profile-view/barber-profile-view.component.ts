import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-barber-profile-view',
  templateUrl: './barber-profile-view.component.html',
  styleUrls: ['./barber-profile-view.component.css']
})
export class BarberProfileViewComponent implements OnInit {
  userId: string;
  barberDb: Barber = new Barber();
  barber: Barber = new Barber();
  strAvatar: any;
  salonName: string;
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
          console.log(params);
          this.userId = params.userId;
          if (this.userId) {
              this.refreshUserProfile(this.userId);
          }

      });
  }

  updateUserProfile() {
      if ((JSON.stringify(this.barberDb) !== JSON.stringify(this.barber)) || (this.selectedFile !== null)) {
          // console.log('Khac' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
          // update user profile
          this.salonUtilService.updateBarber(this.userId, this.barber, this.selectedFile).subscribe(
              () => // refresh page
              this.refreshUserProfile(this.userId)
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
                  this.strAvatar = 'http://localhost:3000/' + this.barber.avatar;
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
