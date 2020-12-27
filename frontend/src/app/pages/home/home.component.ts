import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'app/module/global-constants';
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
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.prefixPath = environment.baseUrl;
    this.getCities().then(cities => {
      this.cities = cities;
      console.log(this.cities);
    });
    

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      this.myLatitude = coords.latitude;
      this.myLongitude = coords.longitude;
      this.isDisplayButtonNearby = true;
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );      
    })
  }

  getCities() {
    return this.http.get<any>('assets/json/cities.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }

  selectCityEvent(event){
    console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.selectedDistrict = null;
  }
  selectDistrictEvent(event){
    console.log(event);
    this.selectedDistrict = event;
  }
  onChangeSearch(event){
    //console.log(event);
  }
  onFocused(event){
    //console.log(event);
  }

}
