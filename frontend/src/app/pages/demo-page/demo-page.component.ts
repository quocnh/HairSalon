import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import SalonOwner from '../../module/salonOwner';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';

@Component({
  selector: 'app-demo-page',
  moduleId: module.id,
  templateUrl: 'demo-page.component.html'
})
export class DemoPageComponent implements OnInit {

  salonOwners: SalonOwner[] = [];
  salons: Salon[] = [];

  constructor(private salonUtilService: SalonUtilsService) { }

  ngOnInit() {
    this.salonUtilService.getSalonOwners()
      .subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }


}
