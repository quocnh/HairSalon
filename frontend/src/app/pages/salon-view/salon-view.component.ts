import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-salon-view',
  moduleId: module.id,
  templateUrl: './salon-view.component.html'
})

export class SalonViewComponent implements OnInit {
  salons: Salon[] = [];

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      const ownerId = param.ownerId;
      if (!ownerId) {
        return;
      }
      this.salonUtilService.getSalons(ownerId).subscribe((salons: Salon[]) => this.salons = salons);
    });
  }

  createNewSalon() {
    console.log('Create new salon');
    // TODO: Implement create new salon form popup
  }

}
