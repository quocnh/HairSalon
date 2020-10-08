import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Service from '../../module/service';
import { Lightbox } from 'ngx-lightbox';

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
  strPhotos: any = new Array();
  time = {hour: 13, minute: 30};
  meridian = true;

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    private _lightbox: Lightbox,
    ) { }

  ngOnInit(): void {
    this.strPhotos[0] = 'assets/img/damir-bosnjak.jpg';

    this.strPhotos[1] = 'assets/img/damir-bosnjak.jpg';
    this.strPhotos[2] = 'assets/img/damir-bosnjak.jpg';
    this.strPhotos[3] = 'assets/img/damir-bosnjak.jpg';
    this.strPhotos[4] = 'assets/img/damir-bosnjak.jpg';


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
              if (this.salon.photos[i] !== '') {
                this.strPhotos[i] = 'http://localhost:3000/' + this.salon.photos[i];
              }
            }
            console.log(this.salon);
        });
  }

  reserveService() {
    console.log('Reserve Service');
  }

  selectServiceOnChange(sIndex) {
    sIndex -= 1;
    if (sIndex >= 0) {
      this.selectServices.push(this.salon.services[sIndex]);
      // console.log(this.selectServices);
      this.total += +this.salon.services[sIndex].price;
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
