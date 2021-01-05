import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Barber from 'app/module/barber';
import Booking from 'app/module/booking';
import { GlobalConstants } from 'app/module/global-constants';
import Salon from 'app/module/salon';
import { SalonUtilsService } from 'app/salon-utils.service';
import { SearchService } from 'app/_services/search.service';
import { environment } from 'environments/environment';
import Distributor from '../../module/distributor';

@Component({
  selector: 'app-modify-booking',
  templateUrl: './modify-booking.component.html',
  styleUrls: ['./modify-booking.component.css']
})
export class ModifyBookingComponent implements OnInit {

  @Input() public booking;
  @Input() public salon;
  @Input() public customer_username;
  @Input() public modal_index;
  // public distributor: Distributor = new Distributor();

  selectedBarber: Barber;
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  keyword = 'name';

  bookingStatus = GlobalConstants.BookingStatus;
  bookingTime = GlobalConstants.BookingTime;
  barbers: Array<Barber> = [];  
  bTime: string;

  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private searchService: SearchService,
    private salonUtilService: SalonUtilsService
    ) { }

  ngOnInit(): void {
    
    // this.selectedBarber = this.barberList[this.modal_index];
    this.bTime = this.booking.bookingTime;    
    this.modelDob = this.ngbDateParserFormatter.parse(this.booking.bookingDate);
    console.log(this.modelDob);
    console.log(this.selectedBarber);
    this.getSalonInfo(this.salon._id);

  }

  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
        
        for (let i = 0; i < this.salon._barberId.length; i++) {
          this.salonUtilService.getOneBarber(this.salon._barberId[i]).subscribe(
            (barber: Barber) => {
              this.barbers[i] = barber[0];
              // console.log(this.barbers);
            });
        }
        console.log(this.salon);
      });
  }
  selectBarberOnChange(sIndex) {
    if (sIndex >= 0) {
      console.log(this.barbers[sIndex]);
      this.booking._barberId = this.barbers[sIndex]._id;      
    }

  }

  selectStatusEvent(sIndex){
    if (sIndex >= 0) {
      console.log(this.bookingStatus[sIndex]);
      this.booking.status = this.bookingStatus[sIndex];      
    }
  }

  selectBookingTimeEvent(sIndex) {
    if (sIndex >= 0) {
      console.log(this.bookingTime[sIndex]);
      this.booking.bookingTime = this.bookingTime[sIndex];
    }
  }

  doApply(){
    
    this.booking.bookingDate = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);

    console.log(this.booking);
    this.salonUtilService.updateBooking(this.booking).subscribe();
    this.modal.close(this.booking);
  }

}
