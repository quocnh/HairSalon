import { Component, OnInit } from '@angular/core';
import SalonOwner from '../../module/salonOwner';
import { SalonUtilsService } from '../../salon-utils.service';

@Component({
  selector: 'app-demo-page',
  moduleId: module.id,
  templateUrl: 'demo-page.component.html'
})
export class DemoPageComponent implements OnInit {

  salonOwners: SalonOwner[] = [];

  constructor(private salonUtilService: SalonUtilsService) { }

  ngOnInit() {
    this.salonUtilService.getSalonOwners()
      .subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }


}
