import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Salon from '../../module/salon';
import Barber from '../../module/barber';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Service from '../../module/service';
import { Lightbox } from 'ngx-lightbox';
import Booking from 'app/module/booking';
import { environment } from 'environments/environment';

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
  time = {hour: 13, minute: 30};
  meridian = true;
  barbers: Array<Barber> = [];
  booking: Booking = new Booking();

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    private _lightbox: Lightbox,
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
  }
  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
        (salons: Salon) => {
            this.salon = Object.assign({}, salons[0]);
            for (let i = 0; i < this.salon.photos.length; i++) {
              if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
                this.strPhotos[i] = environment.dbAddress+ '/' + this.salon.photos[i];
              }
            }
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
    this.booking._salonId = this.salonId;
    this.salonUtilService.createBooking(this.booking).subscribe(
      (booking: Booking) => {
        console.log(booking);
      });
  }

  selectServiceOnChange(sIndex) {
    sIndex -= 1;
    if (sIndex >= 0) {
      this.selectServices.push(this.salon.services[sIndex]);
      // console.log(this.selectServices);
      this.total += +this.salon.services[sIndex].price;
    }
  }

  selectBarberOnChange(sIndex) {
    if (sIndex > 0) {
      console.log(this.barbers[sIndex - 1]);
    }

  }

  deleteSelectedService(sIndex) {
    // console.log(sIndex);
    this.total -= +this.selectServices[sIndex].price;
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
