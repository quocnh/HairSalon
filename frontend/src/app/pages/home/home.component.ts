import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'app/module/global-constants';
import { SearchService } from 'app/_services/search.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  prefixPath:string;
  public myLongitude:number;
  public myLatitude: number;
  
  keyword = 'name';
  cities:any[];
  districts:any[];
  selectedCity:any;
  selectedDistrict:any;
  isDisplayButtonNearby=false;
  selectedCityName:string = 'none';
  selectedDistrictName:string = 'none';
  
  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.prefixPath = environment.baseUrl;
    this.searchService.getCities().then(cities => {
      this.cities = cities;
      // console.log(this.cities);
    });
    

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      this.myLatitude = coords.latitude;
      this.myLongitude = coords.longitude;
      this.isDisplayButtonNearby = true;
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);      
    })
  }

  selectCityEvent(event){
    // console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.selectedDistrict = null;
    this.selectedCityName = this.selectedCity.name;
    this.selectedDistrictName = 'none';
  }
  selectDistrictEvent(event){
    // console.log(event);
    this.selectedDistrict = event;
    this.selectedDistrictName = this.selectedDistrict.name;
  }
  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }

}
