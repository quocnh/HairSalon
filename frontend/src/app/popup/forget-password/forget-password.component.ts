import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare const FB: any;
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form: any = {};
  isPasswordChanged = false;
  errorMessage = '';  
  isPasswordSame = false;
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
    if(this.form.password1 === this.form.password2)
    {
      this.isPasswordSame = true;
      this.form.password = this.form.password1;

      this.authService.changePassword(this.form).subscribe(
        data => { 
          this.isPasswordChanged = true;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isPasswordChanged = false;
        }
      );
    }

    

    //this.modal.close();    
  }
  
  
}
