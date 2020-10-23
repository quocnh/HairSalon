import { Injectable } from '@angular/core';
/*
// declare var H: any;
declare let H: any;
@Injectable({
  providedIn: 'root'
})
export class HereService {

  public platform: any;
  public geocoder: any;

  public constructor() {
    this.platform = H.service.Platform({
          'app_id': 'MwlZkZCLPK1Mr1GIET1H',
          'app_code': 'KyMsOXKfVumCEoQL-x3qe36tUokDM5uE8v0eumWIx5U'
      });
      this.geocoder = this.platform.getGeocodingService();
  }

  public getAddress(query: string) {
    return new Promise((resolve, reject) => {
        this.geocoder.geocode({ searchText: query }, result => {
            if (result.Response.View.length > 0) {
                if (result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: 'no results found' });
                }
            } else {
                reject({ message: 'no results found' });
            }
        }, error => {
            reject(error);
        });
    });
  }

  public getAddressFromLatLng(query: string) {
    return new Promise((resolve, reject) => {
        this.geocoder.reverseGeocode({ prox: query, mode: 'retrieveAddress' }, result => {
            if (result.Response.View.length > 0) {
                if (result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: 'no results found' });
                }
            } else {
                reject({ message: 'no results found' });
            }
        }, error => {
            reject(error);
        });
    });
  }
}
*/