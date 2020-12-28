import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'app/_services/message.service';
import { SearchService } from 'app/_services/search.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';

import { UserService } from '../../_services/user.service';

declare const L: any;
@Component({
  selector: 'app-main-page',
  moduleId: module.id,
  styleUrls: ['./main-page.component.css'],
  templateUrl: './main-page.component.html'
})


export class MainPageComponent implements OnInit {
  @Input() selectedCityName: string;
  @Input() selectedDistrictName: string;
  content: string;
  latitude:number;
  longitude:number;
  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  mymap: any;
  dbAddress: string;
  prefixPath:string;

  keyword = 'name';
  cities:any[];
  districts:any[];
  selectedCity:any;
  selectedDistrict:any;
    
  //markers:any[];

  // tslint:disable-next-line: no-inferrable-types
  isMapShown: boolean = false;
  buttonMap: String = 'Mở bản đồ';
  isListAllSalon = true;

  messages: any[] = [];
  subscription: Subscription;

  constructor(
    private salonUtilService: SalonUtilsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private messageService: MessageService
  ) {
    // subscribe to home component messages
    this.subscription = this.messageService.onMessage().subscribe(messages => {
      this.messages = [];
      this.messages = messages;
      
      for(var index in this.messages)
      { 
        //console.log(this.messages[index].toString());
        const tmpString:string  = this.messages[index].toString();
        var splitted = tmpString.split(',');
        
        if(splitted.length == 2){
          this.selectedCityName = splitted[0];
          this.selectedDistrictName = splitted[1];
          this.salonUtilService.getSalonsFromCityDistrict(this.selectedCityName, this.selectedDistrictName).subscribe((salons: Salon[]) => this.salons = salons);
          this.isListAllSalon = false;
          //console.log(this.selectedCityName);
          //console.log(this.selectedDistrictName);
        } else if(splitted.length == 1){
          this.selectedCityName = splitted[0];
          this.salonUtilService.getSalonsFromCity(this.selectedCityName).subscribe((salons: Salon[]) => this.salons = salons);
          this.isListAllSalon = false;
          //console.log(this.selectedCityName);
        } else {

        }

      }

    });
  }

  ngOnInit(): void {

    // this.searchService.getCities().then(cities => {
    //   this.cities = cities;
    // });
    
    console.log(this.cities);

    this.prefixPath = environment.baseUrl + '/main';

    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    this.dbAddress = environment.dbAddress;

    this.mapControl(); 

    this.route.params.subscribe((params: Params) => {
      if(params.latitude && params.latitude) {
        this.latitude = params.latitude;
        this.longitude = params.longitude;
        console.log(this.longitude);
        console.log(this.latitude);
        
        
        
        this.latitude = 10.81078;
        this.longitude = 106.66806;

        this.salonUtilService.getSalonsFromLocation(this.longitude, this.latitude).subscribe((salons: Salon[]) => this.salons = salons);
        this.isListAllSalon = false;
      }      
    }); 

    if (this.isListAllSalon) {
      this.refreshAllSalonList();
    }
  }

  ngOnChange(): void {
    console.log(this.selectedCityName);
  }

  refreshAllSalonList() {
    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
  }

  toggleMap() {
    this.isMapShown = !this.isMapShown;
    this.mapControl();
  }

  mapControl() {
    if (this.isMapShown) {
      this.buttonMap = 'Đóng bản đồ';
      this.loadMap();
    } else {
      this.buttonMap = 'Mở bản đồ';
    }
  }

  initMap(lat, long) {
    this.mymap = L.map('hairSalonMap').setView([lat, long], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYmVja3MyM3RkIiwiYSI6ImNrZ3V0amRsMTByOHgycXRtZmgyaDBmN2UifQ.lc0QtC0wwuujjxGvyotlqg'
    }).addTo(this.mymap);
  }

  loadMap() {
    
    navigator.geolocation.getCurrentPosition(() => {
      //Temp Long-Lat
      this.latitude = 10.81078;
      this.longitude = 106.66806;
      
      this.initMap(this.latitude, this.longitude);

      // Marker of current location
      this.addLocationMarker(this.latitude, this.longitude);

      for (var i = 0; i < this.salons.length; i++) {
        // console.log(i + ': ' + this.salons[i].latitude + ';' + this.salons[i].longitude);
        //this.markers[i] = L.marker([this.salons[i].latitude, this.salons[i].longitude]).addTo(this.mymap);
        L.marker([this.salons[i].latitude, this.salons[i].longitude]).addTo(this.mymap);
        //marker.bindPopup(this.salons[i].name).openPopup();
      }
    })


  }
  
  addMarker(lat, long) {
    L.marker([lat, long]).addTo(this.mymap);
  }

  addLocationMarker(lat, long) {
    var circle = L.circle([lat, long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50
    }).addTo(this.mymap);

    //L.marker([lat, long], {icon: redCircleMarker}).addTo(this.mymap);
  }

  mouseOverAction(salon, idx) {
    //console.log('Mouse over action ' + idx);
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      let marker = L.marker([salon.latitude, salon.longitude]).addTo(this.mymap);
      marker.bindPopup(salon.name).openPopup();
    });
  }

  mouseOutAction(salon, idx) {
    //console.log('Mouse out action '+ idx);
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
  handleCityEmptyInput(){
    this.selectedCity = null;
  }
  handleDistrictEmptyInput(){
    this.selectedDistrict = null;
  }
  onFocused(event){
    //console.log(event);
  }

  searchSalons(){
    if (this.selectedCity) {
      //console.log('Search city: ' + this.selectedCity.name);
      if (this.selectedDistrict) {
        //console.log('Search district: ' + this.selectedDistrict.name);
        this.salonUtilService.getSalonsFromCityDistrict(this.selectedCity.name, this.selectedDistrict.name).subscribe((salons: Salon[]) => this.salons = salons);
      } else {
        this.salonUtilService.getSalonsFromCity(this.selectedCity.name).subscribe((salons: Salon[]) => this.salons = salons);
      }
    }
    else {
      this.refreshAllSalonList();
    }
  }

}
