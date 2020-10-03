import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import Salon from '../../module/salon';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Service from '../../module/service';

@Component({
  selector: 'app-salon-edit',
  templateUrl: './salon-edit.component.html',
})
export class SalonEditComponent implements OnInit {
  salonId: string;
  salon: Salon = new Salon();
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  addedService: Service = new Service();
  addedSalon: Salon = new Salon();

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    ) { }

  ngOnInit(): void {
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
            console.log(this.salon);
        });
  }

  showImageSlider() {
    console.log ('Show imageSlider');
  }

  addNewService(service: Service) {
    // TODO
    console.log(service);

    this.salonUtilService.addSalonService(this.salon._id, service).subscribe(
      (salon: Salon) => {
          this.salon = salon;
          this.addedService.name = null;
          this.addedService.price = null;
          // console.log(this.salon);
      });
  }

  deleteService(service: Service) {
    // TODO
    console.log(service);

    this.salonUtilService.delSalonService(this.salon._id, service).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        // console.log(this.salon);
      });
  }

  updateService(service: Service, index: number) {
    // TODO
    console.log(service);

    this.salonUtilService.updateSalonService(this.salon._id, service, index).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        // console.log(this.salon);
      });
  }
}
