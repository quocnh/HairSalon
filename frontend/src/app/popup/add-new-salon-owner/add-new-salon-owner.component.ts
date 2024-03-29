import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SalonUtilsService } from 'app/salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import SalonOwner from '../../module/salonOwner';

@Component({
  selector: 'app-add-new-salon-owner',
  templateUrl: './add-new-salon-owner.component.html',
  styleUrls: ['./add-new-salon-owner.component.css']
})
export class AddNewSalonOwnerComponent implements OnInit {
  public salonOwner: SalonOwner = new SalonOwner();

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

  genders = [
    {value: 'Nam'},
    {value: 'Nữ'},
    {value: 'Khác'}
  ];

  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  keyword = 'name';
  cities:any[];
  districts:any[];
  selectedCity:any;
  selectedDistrict:any;

  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private salonUtilService: SalonUtilsService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });
    // this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
    // this.modelDob = {
    //   year: 1985,
    //   month: 4,
    //   day: 4
    // }
  }

  addNewSalonOwner() {

    //this.salonOwner.dob = this.ngbDateParserFormatter.format(this.modelDob);
    this.salonOwner.firstname = this.firstname;
    this.salonOwner.lastname = this.lastname;
    this.salonOwner.phone = this.phone;
    // this.salonOwner.email = this.email;
    //this.salonOwner.gender = this.gender;

    console.log(this.salonOwner);
    this.modal.close(this.salonOwner);    

  }

  selectCityEvent(event){
    
    this.selectedCity = event;
    this.salonOwner.city = this.selectedCity.name;
    this.districts = event.district;
    console.log(this.salonOwner.city);
  }
  selectDistrictEvent(event){
    
    this.selectedDistrict = event;
    this.salonOwner.district = this.selectedDistrict.name;
    console.log(this.salonOwner.district);

  }
  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }

}
