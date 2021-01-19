import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Salon from '../../module/salon';
import Barber from '../../module/barber';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Service from '../../module/service';
import { Lightbox } from 'ngx-lightbox';
import Booking from 'app/module/booking';
import { environment } from 'environments/environment';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { GlobalConstants } from 'app/module/global-constants';
import { ConfirmComponent } from 'app/popup/confirm/confirm.component';

@Component({
  selector: 'app-salon-view',
  moduleId: module.id,
  templateUrl: './salon-view.component.html',
})

export class SalonViewComponent implements OnInit {

  salonId: string;
  salon: Salon = new Salon();
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  selectServices: Array<Service> = [];
  total: number;
  strPhotos: any = new Array(10);
  time = { hour: 13, minute: 30 };
  meridian = true;
  barbers: Array<Barber> = [];
  booking: Booking = new Booking();

  isLoggedIn = false;
  user: any;
  bookingTime = GlobalConstants.BookingTime;

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    private _lightbox: Lightbox,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    for (var i = 0; i < this.strPhotos.length; i++) {
      if (i < 5) {
        this.strPhotos[i] = 'assets/img/no_image.jpg';
      } else {
        this.strPhotos[i] = 'null';
      }
    }


    this.total = 0;
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.salonId = params.salonId;
      if (this.salonId) {
        this.getSalonInfo(this.salonId);
      }
    });
    this.modelDob = {
      year: this.today.year,
      month: this.today.month,
      day: this.today.day
    }
    this.booking.bookingTime = this.bookingTime[0];
  }
  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
        for (let i = 0; i < this.salon.photos.length; i++) {
          if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
            this.strPhotos[i] = environment.dbAddress + '/' + this.salon.photos[i];
          }
        }
        // console.log(this.salon._barberId);
        for (let i = 0; i < this.salon._barberId.length; i++) {
          this.salonUtilService.getOneBarber(this.salon._barberId[i]).subscribe(
            (barber: Barber) => {
              this.barbers[i] = barber[0];
              // console.log(this.barbers);
            });
        }
        console.log(this.salon);
      });
  }

  reserveService() {
    console.log('Reserve Service');

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.user);
    } else {
      // Not login yet
      return;
    }

    this.booking._salonId = this.salonId;
    this.booking._userId = this.user.id;
    this.booking.status = GlobalConstants.BookingStatus[0];
    
    // this.booking.bookingDate.setUTCDate(20);
    this.booking.bookingDate = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);
    //console.log(this.booking.bookingDate);
    this.salonUtilService.createBooking(this.booking).subscribe(
      (booking: Booking) => {
        //console.log(booking);
        const ref = this.modalService.open(ConfirmComponent);
        ref.componentInstance.confirmInfo = 'Bạn đã thành công đặt lịch vào ngày ' + this.modelDob.day + ' tháng ' + this.modelDob.month + ' năm ' + this.modelDob.year;
        ref.result.then((yes) => {
          
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  selectServiceOnChange(sIndex) {
    sIndex -= 1;
    if (sIndex >= 0) {
      this.selectServices.push(this.salon.services[sIndex]);
      console.log(this.salon.services[sIndex].name);
      console.log(this.salon.services[sIndex].discount);
      if (+this.salon.services[sIndex].discount > 0) {
        this.total += (+this.salon.services[sIndex].price)*(+this.salon.services[sIndex].discount)/100;
      } else {
        this.total += +this.salon.services[sIndex].price;
      }      
    }
  }

  selectBarberOnChange(sIndex) {
    if (sIndex > 0) {
      console.log(this.barbers[sIndex - 1]);
      this.booking._barberId = this.barbers[sIndex - 1]._id;
    }

  }

  selectBookingTimeOnChange(sIndex) {
    if (sIndex > 0) {
      console.log(this.bookingTime[sIndex - 1]);
      this.booking.bookingTime = this.bookingTime[sIndex - 1];
    }
  }

  deleteSelectedService(sIndex) {
    console.log('Xoa ' + sIndex);
    console.log(this.selectServices[sIndex].name);
    if (+this.selectServices[sIndex].discount > 0) {
      this.total -= (+this.selectServices[sIndex].price)*(+this.selectServices[sIndex].discount)/100;
    } else {
      this.total -= +this.selectServices[sIndex].price;
    }

    this.selectServices.splice(sIndex, 1);
  }

  open(index: number): void {
    // open lightbox
    const albums = [];

    for (let i = 0; i < 5; i++) {
      const src = this.strPhotos[i];
      const caption = '';
      const thumb = this.strPhotos[i];

      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      albums.push(album);
    }

    this._lightbox.open(albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
