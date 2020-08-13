import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from '../../module/distributor';
import { AddNewDistributorComponent } from '../../popup/add-new-distributor/add-new-distributor.component';
import { DeleteDistributorComponent } from '../../popup/delete-distributor/delete-distributor.component';

@Component({
  selector: 'app-distributor-view',
  moduleId: module.id,
  templateUrl: './distributor-view.component.html'
})
export class DistributorViewComponent implements OnInit {
  distributors: Distributor[];
  name: string;
  public deletedDistributor: Distributor;

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshDistributorList();
  }

  createNewDistributor() {
    // TODO: Implement create new customer form popup
    const ref = this.modalService.open(AddNewDistributorComponent);

    ref.result.then((result) => {
      if (result) {
        console.log(result);
        this.name = result;

        this.salonUtilService.createDistributor(this.name).subscribe();
        this.refreshDistributorList();
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteDistributor(distributorId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getOneDistributor(distributorId)
      .subscribe((distributors: Distributor[]) =>  {
        this.deletedDistributor = distributors[0];
        console.log('Delete owner ' + this.deletedDistributor.name);
        const ref = this.modalService.open(DeleteDistributorComponent);
        ref.componentInstance.deletedDistributor = this.deletedDistributor;
        ref.result.then((yes) => {
          this.salonUtilService.deleteDistributors(distributorId).subscribe();
          this.refreshDistributorList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshDistributorList() {
    this.salonUtilService.getDistributors()
      .subscribe((distributors: Distributor[]) => this.distributors = distributors);
  }

}
