import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import SalonOwner from '../../module/salonOwner';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'app/_services/search.service';

@Component({
  selector: 'app-add-new-salon',
  templateUrl: './add-new-salon.component.html',
  styleUrls: ['./add-new-salon.component.css']
})
export class AddNewSalonComponent implements OnInit {

  public salon: Salon = new Salon();
  salonOwners: SalonOwner[];
  chosenSalonOwner: SalonOwner;

  keyword = 'name';
  cities:any[];
  districts:any[];
  selectedCity:any;
  selectedDistrict:any;

  constructor(
    public modal: NgbActiveModal,
    private salonUtilService: SalonUtilsService,
    private searchService: SearchService
    ) {}

  ngOnInit(): void {
    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });
    console.log('Load modal');
    this.salonUtilService.getSalonOwners().subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }

  addNewSalon() {
    console.log(this.salon.name);
    console.log(this.chosenSalonOwner.name);
    this.salon._salonOwnerId = this.chosenSalonOwner._id;
    this.salon.address = this.salon.address + ' ' + this.selectedDistrict.name + ' ' + this.selectedCity.name;    
    console.log(this.salon.address);
    this.modal.close(this.salon);
  }

  selectCityEvent(event){
    
    this.selectedCity = event;
    this.salon.city = this.selectedCity.name;
    this.districts = event.district;
    console.log(this.salon.city);
  }
  selectDistrictEvent(event){
    
    this.selectedDistrict = event;
    this.salon.district = this.selectedDistrict.name;
    console.log(this.salon.district);

  }
  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }
}
