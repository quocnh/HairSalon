import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../module/user.service';
import User from '../../module/user';
declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  accessToken: string;
  isLogin: boolean = true;
  public loginObject: User = new User();
  
  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    /*
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
     */
  }

  moveToRegister() {
    console.log('moveToRegister');
    this.isLogin = false;
  }

  login() {
    console.log('login');
  }
/*
  fbLogin() {
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
  }
*/
  fbLogin() {
    this.userService.fbLogin().then(() => {
      console.log('Called service from login component');
      // this.router.navigate(['dashboard']);
    });
  }

  fbLogout() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.logout(function(res) {
                // this part just clears the $_SESSION var
                // replace with your own code
                console.log(res);
            });
        }
    });
  }

  register_ok() {
    this.isLogin = true;
  }

}
