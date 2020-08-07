import { Component, OnInit } from '@angular/core';
import SalonOwner from '../../module/salonOwner';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonOwnerComponent } from '../../popup/add-new-salon-owner/add-new-salon-owner.component';
import { DeleteSalonOwnerComponent } from '../../popup/delete-salon-owner/delete-salon-owner.component';

@Component({
  selector: 'app-demo-page',
  moduleId: module.id,
  templateUrl: 'demo-page.component.html'
})
export class DemoPageComponent implements OnInit {

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
    this.refreshSalonOwnerList();
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
        this.refreshSalonOwnerList();
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteSalonOwner(ownerId: string) {
    // TODO: Implement create new salon owner form popup
    console.log('Delete owner ' + ownerId);


    this.salonUtilService.getOneSalonOwner(ownerId)
      .subscribe((salonOwners: SalonOwner[]) =>  {
        this.deletedSalonOwner = salonOwners[0];

        const ref = this.modalService.open(DeleteSalonOwnerComponent);
        ref.componentInstance.deletedSalonOwner = this.deletedSalonOwner;
        ref.result.then((yes) => {
          this.salonUtilService.deleteSalonOwner(ownerId).subscribe();
          this.refreshSalonOwnerList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshSalonOwnerList() {
    this.salonUtilService.getSalonOwners()
      .subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }

}
