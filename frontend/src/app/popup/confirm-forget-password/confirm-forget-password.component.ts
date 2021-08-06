import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare const FB: any;
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-confirm-forget-password',
  templateUrl: './confirm-forget-password.component.html',
  styleUrls: ['./confirm-forget-password.component.css']
})
export class ConfirmForgetPasswordComponent implements OnInit {
  form: any = {};
  isEmailForgetPasswordSent = false;
  isWrongEmail = false;
  errorMessage = '';  
  @Input() public username;

  constructor(
    public modal: NgbActiveModal,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form.username = this.username;
  }

  onSubmit(): void {


    this.authService.requestChangePassword(this.form).subscribe(
      data => { 
        console.log(data);
        this.isEmailForgetPasswordSent = true;
        this.modal.close();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isWrongEmail = true;
        //this.modal.close();
      }
    );


    

    
  }
  
  
}
