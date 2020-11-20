import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Booking from 'app/module/booking';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-bookings-list-view',
  templateUrl: './bookings-list-view.component.html',
  styleUrls: ['./bookings-list-view.component.css']
})
export class BookingsListViewComponent implements OnInit {

  salonId: string;
  bookingList: Booking[];

  constructor(
    private salonUtilService: SalonUtilsService,
    //private modalService: NgbModal,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.salonId = params.salonId;
      if (this.salonId) {
        this.getBookingsList(this.salonId);
      }
    });
    
  }

  getBookingsList(salonId:string) {
    this.salonUtilService.getBookingsFromSalonId(salonId)
      .subscribe((bookings: Booking[]) => {
        console.log(bookings);
        this.bookingList = bookings;
      });
  }

}
