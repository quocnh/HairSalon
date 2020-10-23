import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import Salon from '../../module/salon';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import Service from '../../module/service';
// import { HereService } from '../../module/here.service';

@Component({
  selector: 'app-salon-edit',
  templateUrl: './salon-edit.component.html',
})
export class SalonEditComponent implements OnInit {
  salonId: string;
  salon: Salon = new Salon();
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  addedService: Service = new Service();
  addedSalon: Salon = new Salon();
  selectedFiles: any = new Array(10);
  strPhotos: any = new Array();
  modifiedAddress: string;

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    // private here: HereService
    ) {
    }

  ngOnInit(): void {
    this.strPhotos[0] = 'assets/img/no_image.jpg';

    this.strPhotos[1] = 'assets/img/no_image.jpg';
    this.strPhotos[2] = 'assets/img/no_image.jpg';
    this.strPhotos[3] = 'assets/img/no_image.jpg';
    this.strPhotos[4] = 'assets/img/no_image.jpg';



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

  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
        (salons: Salon) => {
            this.salon = Object.assign({}, salons[0]);
            for (let i = 0; i < this.salon.photos.length; i++) {
              if (this.salon.photos[i] !== '') {
                this.strPhotos[i] = 'http://localhost:3000/' + this.salon.photos[i];
              }
            }
            console.log(this.salon);
        });
  }

  showImageSlider() {
    console.log ('Show imageSlider');
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
    console.log('Update salon info');
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i]) {
        console.log('Update photos: ' + i + ' ' + this.selectedFiles[i].name);
      }
    }
    if (this.salon.address !== this.modifiedAddress) {
      // update address
      console.log(this.modifiedAddress);
      this.salon.address = this.modifiedAddress;
      // convert to coordinator : long/lat
      this.salonUtilService.getAddressfromHERE(this.modifiedAddress).subscribe(
        (result: any) => {
          console.log(result.items[0].position);
          this.salon.longitude = result.items[0].position.lng;
          this.salon.latitude = result.items[0].position.lat;

          // update DB
          this.salonUtilService.updateSalon(this.salon, this.selectedFiles).subscribe(
            (salon: Salon) => {
              this.salon = salon;
            });
        }
      )
    } else {
      this.salonUtilService.updateSalon(this.salon, this.selectedFiles).subscribe(
        (salon: Salon) => {
          this.salon = salon;
        });
    }

  }

}
