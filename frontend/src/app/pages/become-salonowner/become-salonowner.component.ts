import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-salonowner',
  templateUrl: './become-salonowner.component.html',
  styleUrls: ['./become-salonowner.component.css']
})
export class BecomeSalonownerComponent implements OnInit {
  form: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { 
    console.log("test submit form"); 
  }
}
