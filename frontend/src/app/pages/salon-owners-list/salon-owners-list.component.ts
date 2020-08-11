
import { Component, OnInit } from '@angular/core';
import SalonOwner from '../../module/salonOwner';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonOwnerComponent } from '../../popup/add-new-salon-owner/add-new-salon-owner.component';
import { DeleteSalonOwnerComponent } from '../../popup/delete-salon-owner/delete-salon-owner.component';

@Component({
  selector: 'app-salon-owners-list',
  moduleId: module.id,
  templateUrl: './salon-owners-list.component.html'
})

export class SalonOwnersListComponent implements OnInit {

  salonOwners: SalonOwner[] = [];
  addedSalonOwner: SalonOwner;
  salonOwner: SalonOwner;
  name: string;
  public deletedSalonOwner: SalonOwner;

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.refreshSalonOwnersList();
  }

  createNewSalonOwner() {
    // TODO: Implement create new salon owner form popup
    const ref = this.modalService.open(AddNewSalonOwnerComponent);

    ref.result.then((result) => {
      if (result) {
        console.log(result);
        this.name = result;
        // this.addedSalonOwner.name = result;

        this.salonUtilService.createSalonOwner(this.name).subscribe();
        this.refreshSalonOwnersList();
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteSalonOwner(ownerId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getOneSalonOwner(ownerId)
      .subscribe((salonOwners: SalonOwner[]) =>  {
        this.deletedSalonOwner = salonOwners[0];
        console.log('Delete owner ' + this.deletedSalonOwner.name);
        const ref = this.modalService.open(DeleteSalonOwnerComponent);
        ref.componentInstance.deletedSalonOwner = this.deletedSalonOwner;
        ref.result.then((yes) => {
          this.salonUtilService.deleteSalonOwner(ownerId).subscribe();
          this.refreshSalonOwnersList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshSalonOwnersList() {
    this.salonUtilService.getSalonOwners()
      .subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }

}
