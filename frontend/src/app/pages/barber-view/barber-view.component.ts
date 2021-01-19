import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { AddNewCustomerComponent } from '../../popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../../popup/delete-customer/delete-customer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { AddNewBarberComponent } from 'app/popup/add-new-barber/add-new-barber.component';

@Component({
  selector: 'app-barber-view',
  moduleId: module.id,
  templateUrl: './barber-view.component.html',
})
export class BarberViewComponent implements OnInit {

  barbers: Barber[];
  customer: Barber;
  name: string;
  public itemName: string;
  public deletedBarber: Barber;
  addedBarber: Barber = new Barber();
  public objectName: string;
  salon: Salon = new Salon();
  prefixPath: string;

  keyword = 'username';
  selectedBarber:any;
  displayedBarbers: Barber[] = [];

  isLoggedIn = false;
  user: any;
  isSalonOwner = false;
  isAdmin = false;
  salonId: string;

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    this.prefixPath = environment.baseUrl + this.router.url;

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
    } else {
      // Not login yet
      return;
    }

    this.route.params.subscribe((param: Params) => {
      this.salonId = param.salonId;
      console.log(this.salonId);
      
      if (this.salonId) {
        if ((this.isSalonOwner) || (this.isAdmin)){
          this.refreshBarberList(this.salonId);
        }
      } else {
        if(this.isAdmin) {
          this.refreshBarberListAll();
        }
      }
      
    });   
    
  }

  // --- Autocomplete Code --------------------------
  selectEvent(event){
    console.log(event);
    this.selectedBarber = event;
    this.displayedBarbers = [];
    this.displayedBarbers.push(this.selectedBarber);
  }
  onChangeSearch(event){
    //console.log(event);        
  }
  handleEmptyInput(){
    this.selectedBarber = null;
    this.displayedBarbers = this.barbers;
  }
  onFocused(event){
    //console.log(event);
  }
  // --- Autocomplete Code -------------------------

  createNewBarber() {
    // TODO: Implement create new customer form popup
    const ref = this.modalService.open(AddNewBarberComponent);
    ref.componentInstance.salonId = this.salonId;
    ref.result.then((result) => {
      if (result) {
        console.log(result);

        this.addedBarber.firstname = result.firstname;
        this.addedBarber.username = result.username;
        this.addedBarber.lastname = result.lastname;
        this.addedBarber.phone = result.phone;
        this.addedBarber.email = result.email;
        this.addedBarber.dob = result.dob;
        this.addedBarber.gender = result.gender;
        this.addedBarber.profile = result.profile;
        this.addedBarber._salonId = result._salonId;
        this.addedBarber.hometown = result.hometown;
        this.addedBarber.idcard = result.idcard;

        this.salonUtilService.createBarber(this.addedBarber, null).subscribe(
          (yes) => this.refreshBarberList(this.salonId)
        );
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteBarber(barberId: string) {

    this.salonUtilService.getOneBarber(barberId)
      .subscribe((barbers: Barber[]) =>  {
        this.deletedBarber = barbers[0];
        console.log('Delete barber ' + this.deletedBarber.username);

        // display notice popup
        const ref = this.modalService.open(DeleteCustomerComponent);
        ref.componentInstance.itemName = this.deletedBarber.username;

        // delete barber
        ref.result.then((yes) => {
          this.salonUtilService.deleteBarber(barberId).subscribe(
            () => this.refreshBarberList(this.salonId)
          );
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshBarberList(salonId) {
    this.salonUtilService.getBarbersFromSalonId(salonId)
      .subscribe((barbers: Barber[]) => {
        this.barbers = barbers;
        this.displayedBarbers = this.barbers;
        for (let i = 0; i < barbers.length; i++) {
          this.getSalonName(barbers[i]._salonId).then(data => (barbers[i].salonName = data));
        }
      });
  }

  refreshBarberListAll() {
    this.salonUtilService.getBarbers()
      .subscribe((barbers: Barber[]) => {
        this.barbers = barbers;
        this.displayedBarbers = this.barbers;
        for (let i = 0; i < barbers.length; i++) {
          this.getSalonName(barbers[i]._salonId).then(data => (barbers[i].salonName = data));
        }
      });
  }

  async getSalonName(salonId: string): Promise<string> {
    let salonName = 'undefined';
    await this.salonUtilService.getOneSalon(salonId)
    .toPromise()
    .then(
      (salons: Salon[]) => {        
        if (salons.length > 0) {
          return salons[0].name;  
        }
        return '';
      }).then(data => salonName = data);
    return salonName;
  }




}
