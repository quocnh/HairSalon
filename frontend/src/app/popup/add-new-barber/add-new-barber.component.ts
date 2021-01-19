import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import Customer from '../../module/customer';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SalonUtilsService } from '../../salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import { GlobalConstants } from 'app/module/global-constants';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
  selector: 'app-add-new-barber',
  templateUrl: './add-new-barber.component.html',
  styleUrls: ['./add-new-barber.component.css']
})
export class AddNewBarberComponent implements OnInit {
  @Input() 
  public salonId;  
  public barber: Barber = new Barber();

  salons: Salon[];
  chosenSalon: Salon;

  username: string;
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  dob: string;
  gender: string;
  district: string;
  city: string;
  address: string;
  avatar: string;
  idcard: string;
  hometown: string;

  genders = GlobalConstants.Genders;

  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  keyword = 'name';
  cities:any[];
  districts:any[];
  selectedCity:any;
  selectedDistrict:any;

  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  
  user: any;
  isAdmin = false;
  isSalonOwner = false;


  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private salonUtilService: SalonUtilsService,
    private searchService: SearchService,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
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
    
    console.log(this.salonId);
    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });

    this.modelDob = {
      year: 1985,
      month: 4,
      day: 4
    }

    if (this.isAdmin) {
      this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
    } else if (this.isSalonOwner) {
      this.salonUtilService.getOneSalon(this.salonId).subscribe((salons: Salon[]) => this.salons = salons);
    }

    
    
  }

  addNewObject() {

    console.log(this.chosenSalon);
    this.barber.dob = this.ngbDateParserFormatter.format(this.modelDob);
    this.barber.username = this.username;
    this.barber.firstname = this.firstname;
    this.barber.lastname = this.lastname;
    this.barber.phone = this.phone;
    this.barber.email = this.email;
    this.barber.gender = this.gender;
    this.barber._salonId = this.chosenSalon._id;
    this.barber.hometown = this.hometown;
    this.barber.idcard = this.idcard;

    console.log(this.barber);
    this.modal.close(this.barber);


  }

  selectSalonEvent(event){
    
    this.chosenSalon = event;    
    console.log(this.chosenSalon);
  }

  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }

}
