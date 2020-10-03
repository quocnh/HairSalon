import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Service from '../../module/service';

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


  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    ) { }

  ngOnInit(): void {
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
            console.log(this.salon.name);
        });
  }

  showImageSlider() {
    console.log ('Show imageSlider');
  }
  reserveService() {
    console.log('Reserve Service');
  }

  selectServiceOnChange(sIndex) {
    this.selectServices.push(this.salon.services[sIndex]);
    // console.log(this.selectServices);
    this.total += +this.salon.services[sIndex].price;
  }
}
