import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
    this.prefixPath = environment.baseUrl;

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      this.myLatitude = coords.latitude;
      this.myLongitude = coords.longitude;
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );      
    })
  }

}
