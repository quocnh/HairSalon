import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import Salon from '../../module/salon';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Service from '../../module/service';
import { environment } from 'environments/environment';
import { SearchService } from 'app/_services/search.service';
import { newArray } from '@angular/compiler/src/util';
// import { HereService } from '../../module/here.service';

declare var google: any;

@Component({
  selector: 'app-salon-edit',
  templateUrl: './salon-edit.component.html',
})
export class SalonEditComponent implements OnInit {
  salonId: string;
  salon: Salon = new Salon();
  salonDb: Salon = new Salon();
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  addedService: Service = new Service();
  addedSalon: Salon = new Salon();
  selectedFiles: any = new Array(10);
  deletedList: any = new Array(10);
  // selectedDetailSalonFiles:any = new Array(5);
  strPhotos: any = new Array(10);
  strCustomerPhotos:any = new Array();
  // strDetailSalonPhotos:any = new Array(10);
  modifiedAddress: string;

  keyword = 'name';
  initialCity: string = '';
  initialDistrict: string = '';
  cities: any[];
  districts: any[];
  selectedCity: any;
  selectedDistrict: any;
  flagUpdate = false;

  map:any;
  marker:any;

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {

    for (var i = 0; i < this.strPhotos.length; i++) {
      if (i < 5) {
        this.strPhotos[i] = 'assets/img/no_image.jpg';
      } else {
        this.strPhotos[i] = 'assets/img/no_photo_available.png';
      }
      this.deletedList[i] = 0;

    }

    this.searchService.getCities().then(cities => {
      this.cities = cities;
    });

    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.salonId = params.salonId;
      if (this.salonId) {
        this.getSalonInfo(this.salonId);
      }
    });
    this.modelDob = {
      year: this.today.year,
      month: this.today.month,
      day: this.today.day
    }
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    })
  }

  initMap() {    
    var initLat='10.81078';
    var initLong='106.66806';

    if ((this.salon.latitude !== undefined) && (this.salon.longitude !== undefined)){
       initLat = this.salon.latitude;
       initLong = this.salon.longitude;
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
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] },
        { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
      ]

    }
    console.log(document.getElementById("map"));
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    const locationButton = document.createElement("button");
    locationButton.textContent = "Cập nhật vị trí salon";
    locationButton.classList.add("custom-map-control-button");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    const infoWindow = new google.maps.InfoWindow();
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      console.log('cap nhat');

      this.marker.setMap(null);
      // console.log(this.salon.latitude, this.salon.longitude);
      if (((this.salon.latitude !== undefined) && (this.salon.longitude !== undefined)) &&
          ((this.salon.latitude !== '') && (this.salon.longitude !== '')) &&
          ((this.salon.latitude !== null) && (this.salon.longitude !== null)))
      {
        this.createSalonMarker();
      }
      else {
        var geocoder = new google.maps.Geocoder();
        var address = this.salon.address + ' ' + this.salon.district + ' ' + this.salon.city;
        // Convert address to long-lat
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            console.log(results[0].geometry.location);
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    });

  }

  loadMap() {
    this.initMap();
    this.createSalonMarker();
  }

  createSalonMarker(){
    var salonPos = new google.maps.LatLng(this.salon.latitude, this.salon.longitude);
    this.marker = new google.maps.Marker({
        position: salonPos,
        title: this.salon.name,
        map: this.map
    });
  }


  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
        this.salonDb = Object.assign({}, salons[0]);
        this.strCustomerPhotos = [];
        this.strPhotos = [];
        for (let i = 0; i < this.cities.length; i++){
          if (this.cities[i].name === this.salon.city){
            this.districts = this.cities[i].district;
            break;
          }
        }
        this.selectedCity = this.salon.city;
        for (let i = 0; i < this.salon.photos.length; i++) {
          if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
            this.strPhotos[i] = environment.dbAddress + '/' + this.salon.photos[i];
          }
        }
        for (let i = 0; i < this.salon.customerPhotos.length; i++) {
          if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
            this.strCustomerPhotos.push(environment.dbAddress + '/' + this.salon.customerPhotos[i]);
          }
        }
        this.loadMap();
        console.log(this.salon);
      });
  }

  showImageSlider() {
    console.log('Show imageSlider');
  }

  addNewService(service: Service) {
    // TODO
    // console.log(service);

    this.salonUtilService.addSalonService(this.salon._id, service).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        this.addedService.name = null;
        this.addedService.price = null;
        // console.log(this.salon);
      });
  }

  deleteService(service: Service) {
    // TODO
    // console.log(service);

    this.salonUtilService.delSalonService(this.salon._id, service).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        // console.log(this.salon);
      });
  }

  updateService(service: Service, index: number) {
    // TODO
    console.log(service);

    this.salonUtilService.updateSalonService(this.salon._id, service, index).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        // console.log(this.salon);
      });
  }

  onFileSelected(event) {
    this.selectedFiles[0] = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.strPhotos[0] = reader.result;
    }
    console.log(this.selectedFiles[0]);
  }

  onSmallPhotoFileSelected(event, idx) {
    this.selectedFiles[idx] = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[idx]);
    reader.onload = (_event) => {
      this.strPhotos[idx] = reader.result;
    }
    console.log(this.selectedFiles[idx]);
  }

  updateSalonInfo() {

    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i]) {
        console.log('Update photos: ' + i + ' ' + this.selectedFiles[i].name);
        this.flagUpdate = true;
      }
    }

    if ((JSON.stringify(this.salonDb) !== JSON.stringify(this.salon)) || (this.flagUpdate)) {
      console.log('Update salon info');
      if (this.salon.district !== this.salonDb.district) {
        this.salon.district = this.selectedDistrict.name;
      }
      if (this.salon.city !== this.salonDb.city) {
        this.salon.city = this.selectedCity.name;
      }
      this.flagUpdate = false;

      if (this.salon.address !== this.salonDb.address) {
        const fullAddress = this.salon.address + ' ' + this.salon.district + ' ' + this.salon.city;
        this.salonUtilService.getAddressfromHERE(fullAddress).subscribe(
          (resposne: any) => {
            console.log(resposne.items[0].position);
            this.salon.longitude = resposne.items[0].position.lng;
            this.salon.latitude = resposne.items[0].position.lat;
  
            this.salonUtilService.updateSalon(this.salon, this.selectedFiles, this.deletedList).subscribe(
              (salon: Salon) => {
                this.salon = salon;
                this.salonDb = salon;
                this.strCustomerPhotos = [];
                this.strPhotos = [];
                for (let i = 0; i < this.salon.photos.length; i++) {
                  if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
                    this.strPhotos[i] = environment.dbAddress + '/' + this.salon.photos[i];
                  }
                }
                for (let i = 0; i < this.salon.customerPhotos.length; i++) {
                  if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
                    this.strCustomerPhotos.push(environment.dbAddress + '/' + this.salon.customerPhotos[i]);
                  }
                }
              }
            );
            this.selectedFiles = [];
            this.deletedList.fill(0);
          }
        )
      } else {
        this.salonUtilService.updateSalon(this.salon, this.selectedFiles, this.deletedList).subscribe(
          (salon: Salon) => {
            this.salon = salon;
            this.salonDb = salon;
            this.strCustomerPhotos = [];
            this.strPhotos = [];
            for (let i = 0; i < this.salon.photos.length; i++) {
              if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
                this.strPhotos[i] = environment.dbAddress + '/' + this.salon.photos[i];
              }
            }
            for (let i = 0; i < this.salon.customerPhotos.length; i++) {
              if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
                this.strCustomerPhotos.push(environment.dbAddress + '/' + this.salon.customerPhotos[i]);
              }
            }
          }
        );
        this.selectedFiles = [];
        this.deletedList.fill(0);
      }     
      
    }
  }

  selectCityEvent(event) {
    // console.log(event);
    this.selectedCity = event;
    this.districts = event.district;
    this.salon.city = this.selectedCity.name;
    // console.log(this.salonOwner.city);
  }
  selectDistrictEvent(event) {
    // console.log(event);
    this.selectedDistrict = event;
    this.salon.district = this.selectedDistrict.name;
    // console.log(this.salonOwner.district);
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

  onFileSelectedDetailSalon(event, idx) {
    this.flagUpdate = true;
    this.selectedFiles[idx] = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[idx]);
    reader.onload = (_event) => {
      this.strPhotos[idx] = reader.result;
    }
    console.log(this.selectedFiles[idx]);
  }

  deletePhoto(idx) {
    this.strPhotos[idx] = 'assets/img/no_photo_available.png';
    //this.product.photos[idx] = 'null';
    this.deletedList[idx] = 1;
    this.flagUpdate = true;
  }

  onFileSelectedCustomerPhotos(event){
    
    this.selectedFiles[0] = event.target.files[0];
    console.log(this.selectedFiles[0]);
    this.salonUtilService.updateSalonCustomerPhotos(this.salon, this.selectedFiles).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        this.salonDb = salon;
        this.strCustomerPhotos=[];
        for (let i = 0; i < this.salon.customerPhotos.length; i++) {
          if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
            this.strCustomerPhotos.push(environment.dbAddress + '/' + this.salon.customerPhotos[i]);
          }
        }
      }
    );
    this.selectedFiles = [];
  }

  deleteCustomerPhoto(idx){
    console.log(this.salon.customerPhotos[idx]);


    this.salonUtilService.deleteCustomerPhotos(this.salon._id, this.salon.customerPhotos[idx]).subscribe(
      (salon: Salon) => {
        this.salon = salon;
        this.salonDb = salon;
        this.strCustomerPhotos=[];
        for (let i = 0; i < this.salon.customerPhotos.length; i++) {
          if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
            this.strCustomerPhotos.push(environment.dbAddress + '/' + this.salon.customerPhotos[i]);
          }
        }
      }
    );
  }

}
