import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8888/api/salon-owner/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BecomeSalonOwnerService {

  constructor(private http: HttpClient) { }
  // update roles
  creatBecomeSalonOwner(obj): Observable<any> {
    console.log("Create a new become-salon-owner obj: " + obj.username + "," + obj.lastname);
    console.log(API_URL + 'newObj');
    return this.http.post(API_URL + 'newObj', {
      _userId: "5fde7118712b3c4ff65a377d",
      username: obj.username,
      // firstname: obj.firstname,
      // lastname: obj.lastname,
      // email: obj.email,
      // city: obj.city,
      // phone: obj.phone,
      // district: obj.district,
      status: "processing",
    }, httpOptions);
  }

  getAllBecomeSalonOwner(): Observable<any> {
    console.log("get all application request: ");
   
    return this.http.get(API_URL + 'getAll', {
    });
  }
}
