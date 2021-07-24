import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import SalonOwner from '../../module/salonOwner';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'app/_services/search.service';
import GLocation from 'app/module/location';
import { TokenStorageService } from 'app/_services/token-storage.service';

declare var google: any;

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

  map: any;
  marker: any;

  isLoggedIn = false;
  user: any;
  isAdmin = false;
  isSalonOwner = false;

  constructor(
    public modal: NgbActiveModal,
    private salonUtilService: SalonUtilsService,
    private searchService: SearchService,
    private tokenStorageService: TokenStorageService
    ) {}

  ngOnInit(): void {
    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      this.modal.close(this.salon);
    }

    console.log('Load modal');
    if (this.isAdmin) {
      this.salonUtilService.getSalonOwners().subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
    } else if (this.isSalonOwner) {
      this.salonUtilService.getSalonOwnerIdFromUserId(this.user.id).subscribe(
        (retOwnerId: string) => {
          this.salon._salonOwnerId = retOwnerId;          
        }
      );
    } else {
      this.modal.close(this.salon);
    }
    
  }

  addNewSalon() {
    let location: GLocation;
    console.log(this.salon.name);
    if (this.isAdmin) {
      console.log(this.chosenSalonOwner.name);
      this.salon._salonOwnerId = this.chosenSalonOwner._id;
    }
    
    this.salon.address = this.salon.address + ' ' + this.selectedDistrict.name + ' ' + this.selectedCity.name;    
    console.log(this.salon.address);

    if(this.salon.info == null || this.salon.info == ""){
      this.salon.info = "Chưa có thông tin";
    }

    this.getLatLng(this.salon.address).then(data=> {
      location = data;
      this.salon.latitude = location.lat;
      this.salon.longitude = location.lng;
      console.log(this.salon);
      this.modal.close(this.salon);
    })
    
  }
        
  getLatLng(address: string): Promise<GLocation> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: address
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            var latLng = new GLocation();
            latLng.lat = results[0].geometry.location.lat();
            latLng.lng = results[0].geometry.location.lng();

            resolve(latLng);
          } else {
            reject(new Error(status));
          }
        }
      );
    });
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
