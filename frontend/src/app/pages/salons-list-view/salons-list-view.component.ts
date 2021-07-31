import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSalonComponent } from '../../popup/add-new-salon/add-new-salon.component';
import { DeleteSalonComponent } from '../../popup/delete-salon/delete-salon.component';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

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
  prefixPath: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  username: string;
  user: any;
  isAdmin = false;
  isSalonOwner = false;
  page:number = 1;

  keyword = 'name';
  selectedSalon:any;
  displayedSalons: Salon[] = [];
  
  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.prefixPath = environment.baseUrl + this.router.url;

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      //this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }

    if (this.isAdmin) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        if (params.salonOwnerId) {
          // For admin controller
          this.ownerId = params.salonOwnerId;
          this.refreshSalonList();
          this.isListAllSalons = false;
        } else {
          this.isListAllSalons = true;
          this.refreshAllSalonList();
        }
      });
    } else {
      console.log('USER ID:');
      console.log(this.user.id);    
      this.salonUtilService.getSalonOwnerIdFromUserId(this.user.id).subscribe(
        (retOwnerId: string) => {
          this.ownerId = retOwnerId;
          console.log(this.ownerId);
          if (this.ownerId) {
            this.refreshSalonList();
            this.isListAllSalons = false;
          } else {
            console.log("Can't find salon Owner Id");
          }            
        }
      );
    }    
  }

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
    this.selectedSalon = event;
    this.displayedSalons = [];
    this.displayedSalons.push(this.selectedSalon);
  }
  onChangeSearch(event){
    //console.log(event);        
  }
  handleEmptyInput(){
    this.selectedSalon = null;
    this.displayedSalons = this.salons;
  }
  onFocused(event){
    //console.log(event);
  }
  // --- Autocomplete Code -------------------------

  createNewSalon() {
    console.log('Create new salon');
    // TODO: Implement create new salon owner form popup
    const ref = this.modalService.open(AddNewSalonComponent);

    ref.result.then((result) => {
      if (result) {
        console.log('RESULT: added salon name' + result.name);
        this.addedSalon = result;
        console.log('RESULT: owner salon id' + this.addedSalon._salonOwnerId);
        this.addedSalon.ratingAverage = 4.5;
        this.addedSalon.ratingQuantity = 0;
        if (this.isListAllSalons) {
          // Case list all salons from admin account
          if ((this.addedSalon.name !== null) && (this.addedSalon._salonOwnerId !== null)) {
            console.log('Create Salon from admin');
            // if (this.addedSalon.address !== null) {
            //   this.salonUtilService.getAddressfromHERE(this.addedSalon.address).subscribe(
            //     (resposne: any) => {
            //       console.log(resposne.items[0].position);
            //       this.addedSalon.longitude = resposne.items[0].position.lng;
            //       this.addedSalon.latitude = resposne.items[0].position.lat;

            //       // create salon
            //       this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
            //         () => this.refreshAllSalonList()
            //       );
            //     }
            //   )
            // } else {
            //   this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
            //     () => this.refreshAllSalonList()
            //   );
            // }            
            this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
              () => this.refreshAllSalonList()
            );
          }
        } else if ((this.addedSalon.name !== null) && (this.ownerId !== null)) {
          // Case add salon from owner account
          console.log('Create Salon from owner');
          this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
            () => this.refreshSalonList()
          );

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
          this.salonUtilService.deleteSalons(salonId).subscribe(
            () => {
                if (this.isListAllSalons) {
                  this.refreshAllSalonList();
                } else {
                  this.refreshSalonList();
                }
              }
          );

        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshSalonList() {
    this.salonUtilService.getSalonsFromOwnerId(this.ownerId).subscribe((salons: Salon[]) => {
      //console.log(salons);
      this.salons = salons;
      this.displayedSalons = salons;
    });
  }

  refreshAllSalonList() {
    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => 
    {
      this.salons = salons;
      this.displayedSalons = salons;
    });
  }

}
