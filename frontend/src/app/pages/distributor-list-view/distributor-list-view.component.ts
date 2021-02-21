import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from '../../module/distributor';
import { AddNewDistributorComponent } from '../../popup/add-new-distributor/add-new-distributor.component';
import { DeleteDistributorComponent } from '../../popup/delete-distributor/delete-distributor.component';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/_services/token-storage.service';
import User from 'app/module/userAccount';

@Component({
  selector: 'app-distributor-list-view',
  moduleId: module.id,
  templateUrl: './distributor-list-view.component.html'
})
export class DistributorListViewComponent implements OnInit {
  distributors: User[] = new Array();
  name: string;
  public deletedDistributor: User;
  prefixPath: string;
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;

  keyword = 'name';
  selectedDistributor:any;
  displayedDistributors: User[] = new Array();

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

  page:number = 1;
  key:string = 'id';
  reverse: boolean = false;
  sort(key) {
    console.log(key);
    this.key = key;
    this.reverse = !this.reverse;
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

  deleteDistributor(userId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getUser(userId)
      .subscribe((user: User[]) =>  {
        this.deletedDistributor = user[0];
        console.log('Delete owner ' + this.deletedDistributor.username);
        const ref = this.modalService.open(DeleteDistributorComponent);
        ref.componentInstance.deletedDistributor = this.deletedDistributor;
        ref.result.then((yes) => {
          this.salonUtilService.deleteDistributorsFromUserId(this.deletedDistributor._id).subscribe(
            ()=>this.refreshDistributorList()
          );
          
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshDistributorList() {
    this.distributors=[];
    this.displayedDistributors=[];
    this.salonUtilService.getDistributors()
      .subscribe((distributors: Distributor[]) => 
      {
        
        for (var i = 0; i < distributors.length; i++) {
          this.salonUtilService.getUser(distributors[i]._userId)
          .subscribe((user: User[]) => {
            this.distributors.push(user[0]);
            this.displayedDistributors.push(user[0]);
          })
        }
        
      });
  }

}
