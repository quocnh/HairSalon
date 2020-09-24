import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';

@Component({
  selector: 'app-salon-view',
  moduleId: module.id,
  templateUrl: './salon-view.component.html',
})

export class SalonViewComponent implements OnInit {

  salonId: string;
  salon: Salon = new Salon();

  constructor(
    private route: ActivatedRoute,
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

}
