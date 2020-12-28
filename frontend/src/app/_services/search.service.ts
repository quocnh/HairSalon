import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getCities() {
    return this.http.get<any>('assets/json/cities.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }
}
