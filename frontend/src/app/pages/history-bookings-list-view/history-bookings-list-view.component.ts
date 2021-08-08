import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Barber from 'app/module/barber';
import Booking from 'app/module/booking';
import Salon from 'app/module/salon';
import User from 'app/module/userAccount';
import { ModifyBookingComponent } from 'app/popup/modify-booking/modify-booking.component';
import { SalonUtilsService } from 'app/salon-utils.service';
import { DeleteAnyComponent } from '../../popup/delete-any/delete-any.component';

@Component({
  selector: 'app-history-bookings-list-view',
  templateUrl: './history-bookings-list-view.component.html',
  styleUrls: ['./history-bookings-list-view.component.css']
})
export class HistoryBookingsListViewComponent implements OnInit {

  salonId: string;
  userId: string;
  bookingList: Booking[];
  salon: Salon = new Salon();
  customerList: User[] = [];
  salonList: Salon[] = [];
  barberList: Barber[] = [];
  customer_username: string;
  modal_index: number;

  constructor(
    private salonUtilService: SalonUtilsService,
    //private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      

      this.userId = params.userId;
      this.getBookingsListFromUserId(this.userId);

    });

  }
  
  page:number = 1;
  key:string = 'id';
  reverse: boolean = false;
  sort(key) {
    console.log(key);
    this.key = key;
    this.reverse = !this.reverse;
  }

  async getBookingsListFromUserId(userId: string) {
    this.salonUtilService.getBookingsFromUserId(userId)
      .subscribe((bookings: Booking[]) => {        
                
        for (var i = 0; i < bookings.length; i++) {
          const idx = i;   
          this.customerList[idx] = new User;
          this.barberList[idx] = new Barber;
          this.salonList[idx] = new Salon;
          this.bookingList = bookings;
          //console.log(bookings[idx]);
          if (bookings[idx]._userId) {  
                   
            this.getSalonInfo(bookings[idx]._salonId, idx).then(data => {
              //console.log(data);              
            });
          }
          if (bookings[idx]._barberId) {  
                   
            this.getBarberInfo(bookings[idx]._barberId, idx).then(data => {
              //console.log(data);              
            });
          }        
        }        
      });
  }

  async getSalonInfo(salonId: string, index:number): Promise<Salon> {
    let salon:Salon = new Salon();
    await this.salonUtilService.getOneSalon(salonId)
    .toPromise()
    .then(
      (salons: Salon[]) => {        
        return Object.assign({}, salons[0]);
      }).then(data => {
        salon = data;
        this.salonList[index] = data;
      });    
    return salon;
  }

  async getBarberInfo(barberId: string, index:number): Promise<Barber> {
    let barber:Barber;
    await this.salonUtilService.getOneBarber(barberId)
    .toPromise()
    .then(
      (barbers: Barber[]) => {        
        return Object.assign({}, barbers[0]);
      }).then(data => {
        barber = data;
        this.barberList[index] = data;
      });    
    return barber;
  }

  deleteBooking(bookId: string, idx:number){

    console.log('Delete book from customer ' + this.customerList[idx]);
    const ref = this.modalService.open(DeleteAnyComponent);
    ref.componentInstance.deletedText = 'thông tin booking của ' + this.customerList[idx].username;
    ref.result.then((yes) => {
      this.salonUtilService.deleteOneBooking(bookId).subscribe();
      this.getBookingsListFromUserId(this.userId);
    },
    (cancel) => {
      console.log('cancel click');
    })
  
  }
  
  modifyBooking(bookingId: string, idx: number){
    console.log('Modify booking ');
    this.modal_index = idx;
    this.customer_username = this.customerList[idx].username;
    this.salonUtilService.getOneBooking(bookingId).subscribe(
      (booking: Booking) => {
        const ref = this.modalService.open(ModifyBookingComponent);
        ref.componentInstance.booking = Object.assign({}, booking[0]);
        ref.componentInstance.customer_username = this.customer_username;
        ref.componentInstance.modal_index = this.modal_index;
        ref.componentInstance.salon = this.salon;
        ref.result.then((result) => {
          //console.log(result);
          this.getBookingsListFromUserId(this.userId);
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }
  
}
