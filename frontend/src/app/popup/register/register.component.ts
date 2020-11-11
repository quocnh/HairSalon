import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import User from '../../module/user';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() 
  public role;
  public userObject: User = new User();
  
  constructor(
    private _router:Router,
    public modal: NgbActiveModal,
    ) { }


  username: string;
  email: string;
  password: string;

  ngOnInit(): void {
    console.log("Role: ", this.role);
  }
  register(){
    console.log("register xxx");
    if (this.role == 'customer') {
      this.userObject.email = this.email;
      this.userObject.username = this.username;
      this.userObject.password = this.password;
      console.log(this.userObject);
      this.modal.close(this.userObject);
    }
  }
  moveToLogin(){
    this._router.navigate(['./login']);
  }
}
