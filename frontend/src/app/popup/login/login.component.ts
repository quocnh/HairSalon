import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const FB: any;
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ConfirmForgetPasswordComponent } from '../confirm-forget-password/confirm-forget-password.component';

import { RegisterComponent } from '../register/register.component';

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
  isForgetPasswordFailed  = false;
  isEmailForgetPasswordSent = false;

  constructor(
    public modal: NgbActiveModal,
    // private userService: UserService,
    private authService: AuthService, private tokenStorage: TokenStorageService,
    private modalService: NgbModal
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
    this.isForgetPasswordFailed = false;
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

  forgetPassword(username:string){
    if (username === undefined) {
      this.isForgetPasswordFailed = true;
    }
    else {
      this.isForgetPasswordFailed = false;      
      const ref = this.modalService.open(ConfirmForgetPasswordComponent);      
      ref.componentInstance.username = username;
      ref.result.then(
        (result) => {
          console.log("Update pass for " + username);
          this.isEmailForgetPasswordSent = true;            
        },
        (cancel) => {
          this.isEmailForgetPasswordSent = false;
          console.log('cancel click');
        })
    }
    
  }

  register() {    
    console.log('call register modal');
    
    const ref = this.modalService.open(RegisterComponent);
    ref.componentInstance.role = 'customer';    
    ref.result.then((result) => {
      // if (result) {
      //   console.log("Result from login modal: ", result.email + result.password);
      //   this.userObject.email = result.email;
      //   this.userObject.password = result.password;
      //   console.log("xx: " + this.userObject);
      //   this.salonUtilService.callRegisterAPI(this.userObject).subscribe();
      // }
      this.isForgetPasswordFailed = false;
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
    },
      (cancel) => {
        console.log('cancel click');
      })
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
