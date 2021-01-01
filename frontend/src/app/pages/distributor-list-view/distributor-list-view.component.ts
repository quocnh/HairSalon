import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from '../../module/distributor';
import { AddNewDistributorComponent } from '../../popup/add-new-distributor/add-new-distributor.component';
import { DeleteDistributorComponent } from '../../popup/delete-distributor/delete-distributor.component';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
  selector: 'app-distributor-list-view',
  moduleId: module.id,
  templateUrl: './distributor-list-view.component.html'
})
export class DistributorListViewComponent implements OnInit {
  distributors: Distributor[];
  name: string;
  public deletedDistributor: Distributor;
  prefixPath: string;
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;

  keyword = 'name';
  selectedDistributor:any;
  displayedDistributors: Distributor[] = [];

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.prefixPath = this.router.url;

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
    }

    this.refreshDistributorList();
  }

  // --- Autocomplete Code --------------------------
  selectEvent(event){
    console.log(event);
    this.selectedDistributor = event;
    this.displayedDistributors = [];
    this.displayedDistributors.push(this.selectedDistributor);
  }
  onChangeSearch(event){
    //console.log(event);        
  }
  handleEmptyInput(){
    this.selectedDistributor = null;
    this.displayedDistributors = this.distributors;
  }
  onFocused(event){
    //console.log(event);
  }
  // --- Autocomplete Code -------------------------

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
      .subscribe((distributors: Distributor[]) => 
      {
        this.distributors = distributors;
        this.displayedDistributors = distributors;
      });
  }

}
