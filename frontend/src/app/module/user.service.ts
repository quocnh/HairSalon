import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const FB: any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '674667756819374',
        xfbml      : true,
        version    : 'v8.0'
      });

      FB.AppEvents.logPageView();

    };

    (function(d, s, id) {
       let js;
       const fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = 'https://connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
   }

  fbLogin() {
    return new Promise((resolve, reject) => {
      /*
      FB.login(result => {
        if (result.authResponse) {
          return this.http
            .post(`http://localhost:8000/users/auth/facebook`, {access_token: result.authResponse.accessToken})
            .toPromise()
            .then(response => {
            const token = response;
            if (token) {
              localStorage.setItem('id_token', JSON.stringify(token));
            }
            resolve(response);
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' });
      */
     console.log('fb login');
    FB.login(function(response) {
      console.log(response.status);
      if (response.status === 'connected') {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        const uid = response.authResponse.userID;
        this.accessToken = response.authResponse.accessToken;
        console.log(this.accessToken);
      } else if (response.status === 'not_authorized') {
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
      } else {
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
     });
    });
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:8000/api/auth/me`).toPromise().then(response => {
        resolve(response);
      }).catch(() => reject());
    });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.clear();
  }
}
