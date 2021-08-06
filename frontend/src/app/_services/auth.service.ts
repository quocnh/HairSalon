import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
const AUTH_API = environment.baseAPI + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    //console.log("Singin info from form: " + credentials.username + "," + credentials.password);
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  changePassword(credentials, encryptedData): Observable<any> {
    //console.log("Change password: " + credentials.username + "," + credentials.password);
    return this.http.post(AUTH_API + 'changePassword', {
      username: credentials.username,
      password: credentials.password,
      encryptedData: encryptedData
    }, httpOptions);
  }

  requestChangePassword(credentials): Observable<any> {
    //console.log("Change password: " + credentials.username + "," + credentials.password);
    return this.http.post(AUTH_API + 'requestChangePassword', {
      username: credentials.username,
      email: credentials.email
    }, httpOptions);
  }

  register(user): Observable<any> {
    //console.log("Singup info from form: " + user.username + "," + user.password);
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}