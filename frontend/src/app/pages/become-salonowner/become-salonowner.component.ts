import { Component, OnInit } from '@angular/core';
import { BecomeSalonOwnerService } from '../../_services/become-salon-owner.service';
@Component({
  selector: 'app-become-salonowner',
  templateUrl: './become-salonowner.component.html',
  styleUrls: ['./become-salonowner.component.css']
})
export class BecomeSalonownerComponent implements OnInit {
  form: any = {};
  constructor(
    public becomeSalonOwnerService: BecomeSalonOwnerService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() { 
    console.log("test submit form"); 
    this.becomeSalonOwnerService.creatBecomeSalonOwner(this.form).subscribe(
      data => {
        console.log(data);
      },
      err => {
      }
    );
  }
}
