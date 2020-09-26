import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonComponent } from '../../popup/add-new-salon/add-new-salon.component';
import { DeleteSalonComponent } from '../../popup/delete-salon/delete-salon.component';

@Component({
  selector: 'app-salons-list-view',
  templateUrl: './salons-list-view.component.html',
})
export class SalonsListViewComponent implements OnInit {
  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  addedSalon: Salon = new Salon();

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
        this.isListAllSalons = true;
        this.refreshAllSalonList();
      } else {
        this.refreshSalonList();
        this.isListAllSalons = false;
      }
    });

  }

  createNewSalon() {
    console.log('Create new salon');
    // TODO: Implement create new salon owner form popup
    const ref = this.modalService.open(AddNewSalonComponent);

    ref.result.then((result) => {
      if (result) {
        console.log('RESULT: ' + result);
        this.addedSalon.name = result.name;
        if (this.isListAllSalons) {
          // Case list all salons from admin account
          if ((this.addedSalon.name !== null) && (this.addedSalon._salonOwnerId !== null)) {
            console.log('Create Salon from admin');
            this.salonUtilService.createSalons(this.addedSalon._salonOwnerId, this.addedSalon).subscribe();
            this.refreshAllSalonList();
          }
        } else if ((this.addedSalon.name !== null) && (this.ownerId !== null)) {
          // Case add salon from owner account
          console.log('Create Salon from owner');
          this.salonUtilService.createSalons(this.ownerId, this.addedSalon).subscribe();
          this.refreshSalonList();
        }
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteSalon(salonId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getOneSalon(salonId)
      .subscribe((salons: Salon[]) =>  {
        this.deletedSalon = salons[0];
        console.log('Delete salon name ' + this.deletedSalon.name);
        const ref = this.modalService.open(DeleteSalonComponent);
        ref.componentInstance.deletedSalon = this.deletedSalon;
        ref.result.then((yes) => {
          this.salonUtilService.deleteSalons(salonId).subscribe();
          if (this.isListAllSalons) {
            this.refreshAllSalonList();
          } else {
            this.refreshSalonList();
          }
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshSalonList() {
    this.salonUtilService.getSalonsFromOwnerId(this.ownerId).subscribe((salons: Salon[]) => this.salons = salons);
  }

  refreshAllSalonList() {
    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
  }

}
