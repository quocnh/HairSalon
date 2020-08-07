import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonComponent } from '../../popup/add-new-salon/add-new-salon.component';

@Component({
  selector: 'app-salon-view',
  moduleId: module.id,
  templateUrl: './salon-view.component.html'
})

export class SalonViewComponent implements OnInit {
  salons: Salon[] = [];
  name: string;
  ownerId: string;

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.ownerId = param.ownerId;
      if (!this.ownerId) {
        return;
      }
      this.refreshSalonList();
    });

  }

  createNewSalon() {
    console.log('Create new salon');
    // TODO: Implement create new salon owner form popup
    const ref = this.modalService.open(AddNewSalonComponent);

    ref.result.then((result) => {
      if (result) {
        console.log(result);
        this.name = result;
        // this.addedSalonOwner.name = result;

        this.salonUtilService.createSalons(this.ownerId, this.name).subscribe();
        this.refreshSalonList();
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  refreshSalonList() {
    this.salonUtilService.getSalons(this.ownerId).subscribe((salons: Salon[]) => this.salons = salons);
  }

}
