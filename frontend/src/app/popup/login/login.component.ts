import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
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

  moveToRegister() {
    console.log('moveToRegister');
  }

  login() {
    console.log('login');
  }

  fbLogin() {

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        const uid = response.authResponse.userID;
        const accessToken = response.authResponse.accessToken;
        console.log(accessToken);
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
  }

}
