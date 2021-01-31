import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SalonUtilsService } from '../../salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import { GlobalConstants } from 'app/module/global-constants';
import { TokenStorageService } from 'app/_services/token-storage.service';
import User from 'app/module/userAccount';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  @Input() 
  public objectName;
  public customer: User = new User();
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

  genders = GlobalConstants.Genders;
  objectDisplayedName = 'user';

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

    
    console.log(this.objectName);
    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });
    if (this.objectName === 'customer') {
      this.objectDisplayedName = "khách hàng";
    } else if (this.objectName === 'barber') {
      this.objectDisplayedName = "thợ cắt tóc";
    }

    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
    this.modelDob = {
      year: 1985,
      month: 4,
      day: 4
    }
  }

  addNewObject() {
    if (this.objectName === 'customer') {
      this.customer.dob = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);
      this.customer.username = this.username;
      this.customer.firstname = this.firstname;
      this.customer.lastname = this.lastname;
      this.customer.phone = this.phone;
      this.customer.email = this.email;
      this.customer.gender = this.gender;

      console.log(this.customer);
      this.modal.close(this.customer);
    } else if (this.objectName === 'barber') {
      console.log(this.chosenSalon);
      this.barber.dob = this.ngbDateParserFormatter.format(this.modelDob);
      this.barber.username = this.username;
      this.barber.firstname = this.firstname;
      this.barber.lastname = this.lastname;
      this.barber.phone = this.phone;
      this.barber.email = this.email;
      this.barber.gender = this.gender;
      this.barber._salonId = this.chosenSalon._id;

      console.log(this.barber);
      this.modal.close(this.barber);
    }

  }

  selectCityEvent(event){
    
    this.selectedCity = event;
    this.customer.city = this.selectedCity.name;
    this.districts = event.district;
    console.log(this.customer.city);
  }
  selectDistrictEvent(event){
    
    this.selectedDistrict = event;
    this.customer.district = this.selectedDistrict.name;
    console.log(this.customer.district);

  }
  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }

}
