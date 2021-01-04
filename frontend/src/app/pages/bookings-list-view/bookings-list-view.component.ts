import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Booking from 'app/module/booking';
import Customer from 'app/module/customer';
import Salon from 'app/module/salon';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-bookings-list-view',
  templateUrl: './bookings-list-view.component.html',
  styleUrls: ['./bookings-list-view.component.css']
})
export class BookingsListViewComponent implements OnInit {

  salonId: string;
  bookingList: Booking[];
  salon: Salon = new Salon();
  customerList: Customer[] = [];


  constructor(
    private salonUtilService: SalonUtilsService,
    //private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.salonId = params.salonId;
      if (this.salonId) {
        this.getBookingsList(this.salonId);
        this.getSalonInfo(this.salonId);
      }
    });

  }

  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
      });
  }

  async getBookingsList(salonId: string) {
    this.salonUtilService.getBookingsFromSalonId(salonId)
      .subscribe((bookings: Booking[]) => {
        console.log(bookings.length);
        this.bookingList = bookings;        
        for (var i = 0; i < bookings.length; i++) {
          const idx = i;   
          this.customerList[idx] = new Customer;
          //console.log(bookings[idx]);
          if (this.bookingList[idx]._userId) {  
                   
            this.getCustomerInfo(this.bookingList[idx]._userId, idx).then(data => {
              console.log(data);              
            });
          }          
        }
      });
  }

  async getCustomerInfo(_userId: string, index:number): Promise<Customer> {
    let customer:Customer;
    await this.salonUtilService.getOneCustomerFromUserId(_userId)
    .toPromise()
    .then(
      (customers: Customer[]) => {        
        return Object.assign({}, customers[0]);
      }).then(data => {
        customer = data;
        this.customerList[index] = data;
      });    
    return customer;
  }

  deleteBooking(bookId: string){
    this.salonUtilService.deleteOneBooking(bookId).subscribe();
    this.getBookingsList(this.salonId);
  
  }
  
}
