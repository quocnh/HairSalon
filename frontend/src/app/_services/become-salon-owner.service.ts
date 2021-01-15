import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { GlobalConstants } from 'app/module/global-constants';

const API_URL = environment.baseAPI + '/api/salon-owner/';

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
      // _userId: "5fde7118712b3c4ff65a377d",
      _userId: obj.userId,
      username: obj.username,
      firstname: obj.firstname,
      lastname: obj.lastname,
      email: obj.email,
      city: obj.city,
      phone: obj.phone,
      district: obj.district,
      address: obj.address,
      status: GlobalConstants.ApplicationRequestStatus[0],
    }, httpOptions);
  }

  getAllBecomeSalonOwner(): Observable<any> {
    console.log("get all application request: ");
   
    return this.http.get(API_URL + 'getAll', {
    });
  }

  acceptBecomeSalonOwner(obj): Observable<any> {
    console.log("Accept application request");
   
    return this.http.patch(API_URL + 'accept', {
      _id: obj._id,
      username: obj.username,
      email : obj.email,
      phone : obj.phone,
      firstname : obj.firstname,
      lastname : obj.lastname,      
      status: GlobalConstants.ApplicationRequestStatus[1],
    }, httpOptions);
  }

  rejectBecomeSalonOwner(obj): Observable<any> {
    console.log("Reject application request");
   
    return this.http.patch(API_URL + 'reject', {
      _id: obj._id,
      username: obj.username,      
      status: GlobalConstants.ApplicationRequestStatus[2],
    }, httpOptions);
  }
}
