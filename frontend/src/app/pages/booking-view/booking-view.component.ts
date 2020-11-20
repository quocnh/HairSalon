import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {

  constructor(
    private salonUtilService: SalonUtilsService,
    //private modalService: NgbModal,
    private router:Router
  ) {     
  }

  ngOnInit(): void {
  }

  
}
