import { Component, OnInit } from '@angular/core';
import SalonOwner from '../../module/salonOwner';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonOwnerComponent } from '../../popup/add-new-salon-owner/add-new-salon-owner.component';

@Component({
  selector: 'app-demo-page',
  moduleId: module.id,
  templateUrl: 'demo-page.component.html'
})
export class DemoPageComponent implements OnInit {

  salonOwners: SalonOwner[] = [];
  addedSalonOwner: SalonOwner;
  name: string;
  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.refreshSalonOwnerList();
  }

  createNewSalonOwner() {
    console.log('Create new salon owner');
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

  refreshSalonOwnerList() {
    this.salonUtilService.getSalonOwners()
      .subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);

  }

}
