import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';

declare const L: any;
@Component({
  selector: 'app-main-page',
  moduleId: module.id,
  templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {

  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  FromValue = 500000;
  ToValue = 2000000;

  constructor(
    private salonUtilService: SalonUtilsService,
    ) { }

  ngOnInit(): void {
    this.refreshAllSalonList();
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );

      const mymap = L.map('map').setView([coords.latitude, coords.longitude], 15);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYmVja3MyM3RkIiwiYSI6ImNrZ3V0amRsMTByOHgycXRtZmgyaDBmN2UifQ.lc0QtC0wwuujjxGvyotlqg'
      }).addTo(mymap);

      L.marker([coords.latitude, coords.longitude]).addTo(mymap);

    })

  }

  refreshAllSalonList() {
    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
  }

}
