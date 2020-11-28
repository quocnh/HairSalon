import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import User from '../../module/user';

import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public role;
  public userObject: User = new User();
  
  constructor(
    public modal: NgbActiveModal,
    private _router:Router,
   
    ) { }

  ngOnInit(): void {
    console.log("Role: ", this.role);
  }
  register(){
    console.log("customer registration xxx");
    if (this.role == 'customer') {
      console.log(this.userObject.email);
      console.log(this.userObject.password);
      this.userObject.email = this.userObject.email;
      this.userObject.password = this.userObject.password;
      
      console.log(this.userObject);
      this.modal.close(this.userObject);
    }
  }
  moveToLogin(){
    this._router.navigate(['./login']);
  }
}
