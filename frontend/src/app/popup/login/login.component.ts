import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../module/user.service';
import User from '../../module/user';
declare const FB: any;
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    public modal: NgbActiveModal,
    // private userService: UserService,
    private authService: AuthService, private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

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
  onSubmit(): void {
    console.log("TEST");
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
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
  // fbLogin() {
  //   this.userService.fbLogin().then(() => {
  //     console.log('Called service from login component');
  //     // this.router.navigate(['dashboard']);
  //   });
  // }

  // fbLogout() {
  //   FB.getLoginStatus(function (response) {
  //     if (response.status === 'connected') {
  //       FB.logout(function (res) {
  //         // this part just clears the $_SESSION var
  //         // replace with your own code
  //         console.log(res);
  //       });
  //     }
  //   });
  // }

}
