import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOT_URL;
  readonly HERE_URL;
  readonly HERE_KEY;
  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.baseAPI;
    this.HERE_URL = 'https://geocode.search.hereapi.com/v1/geocode?q=';
    this.HERE_KEY = 'MdY-VgF6O64ulC_vNxa4bmEvIhrkkH85NIjw4ESTFs8';
  }

  get(uri: string) : Observable<any>{
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: object): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: object): Observable<any> {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${this.HERE_URL}${address}&apiKey=${this.HERE_KEY}`);
  }
}
