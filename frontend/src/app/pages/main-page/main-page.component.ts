import { HttpClient } from '@angular/common/http';
import { Position } from '@angular/compiler';
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
declare var google: any;

@Component({
  selector: 'app-main-page',
  moduleId: module.id,
  styleUrls: ['./main-page.component.css'],
  templateUrl: './main-page.component.html'
})


export class MainPageComponent implements OnInit {
  selectedCityName: string;
  selectedDistrictName: string;
  content: string;
  initLatitude: number = 0;
  initLongitude: number = 0;
  myLatitude: number = 0;
  myLongitude: number = 0;
  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  mymap: any;
  dbAddress: string;
  prefixPath: string;

  keyword = 'name';
  cities: any[];
  districts: any[];
  selectedCity: any;
  selectedDistrict: any;

  mapMarkers:any = [];
  mouseOverInfowindow:any;

  // tslint:disable-next-line: no-inferrable-types
  isMapShown: boolean = false;
  buttonMap: String = 'Mở bản đồ';
  isListAllSalon = true;

  messages: any[] = [];
  subscription: Subscription;
  map:any;

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

      for (var index in this.messages) {
        //console.log(this.messages[index].toString());
        const tmpString: string = this.messages[index].toString();
        var splitted = tmpString.split(',');

        if (splitted.length == 2) {
          this.selectedCityName = splitted[0];
          this.selectedDistrictName = splitted[1];
          this.salonUtilService.getSalonsFromCityDistrict(this.selectedCityName, this.selectedDistrictName).subscribe((salons: Salon[]) => this.salons = salons);
          this.isListAllSalon = false;
          //console.log(this.selectedCityName);
          //console.log(this.selectedDistrictName);
        } else if (splitted.length == 1) {
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

    // initial coordinator
    

    // console.log(this.cities);
    this.prefixPath = environment.baseUrl + '/main';
    //this.initMap();
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    this.dbAddress = environment.dbAddress;
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      this.myLatitude = coords.latitude;
      this.myLongitude = coords.longitude;

    });

    this.mapControl();

    this.route.params.subscribe((params: Params) => {
      if (params.latitude !== undefined && params.latitude !== undefined) {
        this.initLatitude = params.latitude;
        this.initLongitude = params.longitude;
        console.log(this.initLongitude);
        console.log(this.initLatitude);


        // LARRY: use for local test
        // this.latitude = 10.81078;
        // this.longitude = 106.66806;

        this.salonUtilService.getSalonsFromLocation(this.initLongitude, this.initLatitude).subscribe(
          (salons: Salon[]) => this.salons = salons
        );
        this.isListAllSalon = false;

      } else if (params.city !== 'none' && params.city !== undefined) {
        this.selectedCityName = params.city;

        if (params.district !== 'none') {
          this.selectedDistrictName = params.district;
          this.salonUtilService.getSalonsFromCityDistrict(this.selectedCityName, this.selectedDistrictName).subscribe(
            (salons: Salon[]) => {
              this.salons = salons;
              if (this.salons[0]) {
                // + : convert string to number
                this.initLatitude = +this.salons[0].latitude;
                this.initLongitude = +this.salons[0].longitude;
              }
            }
          );
        }
        else {
          this.salonUtilService.getSalonsFromCity(this.selectedCityName).subscribe(
            (salons: Salon[]) => {
              this.salons = salons;
              console.log(this.salons);
              if (this.salons[0]) {
                // + : convert string to number
                this.initLatitude = +this.salons[0].latitude;
                this.initLongitude = +this.salons[0].longitude;
              }
            }
          );
        }
        this.isListAllSalon = false;
      }
      else {

        this.refreshAllSalonList();
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
      this.map = '';
    }
  }

  // initMap(lat, long) {
  //   this.mymap = L.map('hairSalonMap').setView([lat, long], 15);

  //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  //     // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     attribution: '',
  //     maxZoom: 18,
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     accessToken: 'pk.eyJ1IjoiYmVja3MyM3RkIiwiYSI6ImNrZ3V0amRsMTByOHgycXRtZmgyaDBmN2UifQ.lc0QtC0wwuujjxGvyotlqg'
  //   }).addTo(this.mymap);
  // }

  // loadMap() {

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const coords = position.coords;
  //     const latLong = [coords.latitude, coords.longitude];
  //     this.myLatitude = coords.latitude;
  //     this.myLongitude = coords.longitude;
  //     this.initMap(this.myLatitude, this.myLongitude);

  //     // Marker of current location
  //     this.addLocationMarker(this.myLatitude, this.myLongitude);

  //     for (var i = 0; i < this.salons.length; i++) {
  //       // console.log(i + ': ' + this.salons[i].latitude + ';' + this.salons[i].longitude);
  //       //this.markers[i] = L.marker([this.salons[i].latitude, this.salons[i].longitude]).addTo(this.mymap);
  //       L.marker([this.salons[i].latitude, this.salons[i].longitude]).addTo(this.mymap);
  //       //marker.bindPopup(this.salons[i].name).openPopup();
  //     }
  //   })


  // }
  initMap() {    
    var initLat;
    var initLong;
    if ((this.myLatitude != 0) && (this.myLongitude != 0)){
      initLat = this.myLatitude;
      initLong = this.myLongitude;
    } else if ((this.initLatitude != 0) && (this.initLongitude != 0)){
      initLat = this.initLatitude;
      initLong = this.initLongitude;
    } else {
      //default value
      initLat = 10.81078;
      initLong = 106.66806;
    }
    var myLatlng = new google.maps.LatLng(initLat, initLong);
    var mapOptions = {
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        { "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] },
        { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] },
        //{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},
        //{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] },
        { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
        //{"featureType":"poi","stylers":[{"visibility":"off"}]},
        //{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},
        //{"featureType":"poi.park","stylers":[{"visibility":"on"}]},
        //{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},
        //{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},
        //{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}
      ]

    }
    console.log(document.getElementById("map"));
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    const locationButton = document.createElement("button");
    locationButton.textContent = "Vị trí của tôi";
    locationButton.classList.add("custom-map-control-button");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    const infoWindow = new google.maps.InfoWindow();
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, infoWindow, this.map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, this.map.getCenter());
      }
    });

  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow,
    pos
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  loadMap() {
    this.initMap();
    

    if ((this.myLatitude != 0) && (this.myLongitude != 0)){
      var myPosition = new google.maps.LatLng(this.myLatitude, this.myLongitude);

      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.75,
        map: this.map,
        center: {lat: this.myLatitude, lng: this.myLongitude },
        radius: 50,       
      });

    }
    for (var i = 0; i < this.salons.length; i++) {
      var salonPos = new google.maps.LatLng(this.salons[i].latitude, this.salons[i].longitude);
      const infowindow = new google.maps.InfoWindow({

        content: this.salons[i].name,
      });

      const marker = new google.maps.Marker({
          position: salonPos,
          title: this.salons[i].name,
          map: this.map
      });
      
      marker.addListener("click", () => {
        infowindow.open(this.map, marker);
      });
      this.mapMarkers.push(marker);
    }
  }

  // addMarker(lat, long) {
  //   L.marker([lat, long]).addTo(this.mymap);
  // }

  // addLocationMarker(lat, long) {
  //   var circle = L.circle([lat, long], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 50
  //   }).addTo(this.mymap);

  //   //L.marker([lat, long], {icon: redCircleMarker}).addTo(this.mymap);
  // }

  mouseOverAction(salon, idx) {
    console.log('Mouse over action ' + idx);
    // navigator.geolocation.getCurrentPosition((position) => {
    //   //console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
    //   let marker = L.marker([salon.latitude, salon.longitude]).addTo(this.mymap);
    //   marker.bindPopup(salon.name).openPopup();
    // });
    
    this.mouseOverInfowindow = new google.maps.InfoWindow({

      content: this.salons[idx].name,
    });
    this.mouseOverInfowindow.open(this.map, this.mapMarkers[idx]);
    this.map.setCenter(this.mapMarkers[idx].getPosition());
  }

  mouseOutAction(salon, idx) {
    //console.log('Mouse out action '+ idx);
    this.mouseOverInfowindow.close();
  }

  selectCityEvent(event) {
    console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.selectedDistrict = null;
  }
  selectDistrictEvent(event) {
    console.log(event);
    this.selectedDistrict = event;
  }
  onChangeSearch(event) {
    //console.log(event);

  }
  handleCityEmptyInput() {
    this.selectedCity = null;
  }
  handleDistrictEmptyInput() {
    this.selectedDistrict = null;
  }
  onFocused(event) {
    //console.log(event);
  }

  searchSalons() {
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
