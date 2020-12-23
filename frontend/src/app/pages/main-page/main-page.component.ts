import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'environments/environment';
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
  //markers:any[];

  // tslint:disable-next-line: no-inferrable-types
  isMapShown: boolean = false;
  buttonMap: String = 'Mở bản đồ';

  constructor(
    private salonUtilService: SalonUtilsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.latitude = params.latitude;
      this.longitude = params.longitude;
      console.log(this.longitude);
      console.log(this.latitude);      

  });


    this.prefixPath = environment.baseUrl + this.router.url;
    this.refreshAllSalonList();
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    this.dbAddress = environment.dbAddress;

    this.mapControl(); 
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
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYmVja3MyM3RkIiwiYSI6ImNrZ3V0amRsMTByOHgycXRtZmgyaDBmN2UifQ.lc0QtC0wwuujjxGvyotlqg'
    }).addTo(this.mymap);
  }

  loadMap() {

    navigator.geolocation.watchPosition(() => {
      this.initMap(10.81078, 106.66806);
      //this.initMap(this.latitude, this.longitude);
      this.addMarker(this.latitude, this.longitude);
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

}
