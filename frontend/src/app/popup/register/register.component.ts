import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  moveToLogin(){
    this._router.navigate(['./login']);
  }
}
