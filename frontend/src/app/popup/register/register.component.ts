import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    public modal: NgbActiveModal,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService

  ) { }

  ngOnInit(): void {

  }
  reloadPage(): void {
    this.router.navigate(['/']);

    if (this.router.url === '/home'){
      window.location.reload();
    }
  }
  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        // automatically log in
        this.authService.login(this.form).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);    

            //this.roles = this.tokenStorage.getUser().roles;
            this.reloadPage();
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}


