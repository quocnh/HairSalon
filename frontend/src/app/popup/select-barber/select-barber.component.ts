import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Barber from 'app/module/barber';
import Salon from 'app/module/salon';
import { SalonUtilsService } from 'app/salon-utils.service';
import { environment } from 'environments/environment';
declare const FB: any;
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'select-barber-password',
  templateUrl: './select-barber.component.html',
  styleUrls: ['./select-barber.component.css']
})
export class SelectBarberComponent implements OnInit {
  
  @Input() public salonId;
  salon: Salon = new Salon();
  barbers: Array<Barber> = [];
  selectedBarber: Barber;
  constructor(
    private salonUtilService: SalonUtilsService,
    public modal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    //console.log(this.salonId);
    this.getSalonInfo(this.salonId);
  }

  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
        
        for (let i = 0; i < this.salon._barberId.length; i++) {
          this.salonUtilService.getOneBarber(this.salon._barberId[i]).subscribe(
            (barber: Barber) => {
              
              if ((barber[0].avatar !== '') && (barber[0].avatar !== undefined)) {
                barber[0].avatar = environment.dbAddress + '/' + barber[0].avatar;
              } else {
                barber[0].avatar = '../../assets/img/default-avatar.png';
              }
              //console.log(barber[0].firstname);
              this.barbers.push(barber[0]);
              //console.log(barber[0]);
            });
        }
        // console.log(this.salon);
      });
  }

  public getBarber(b: Barber) {
    //console.log(b);
    this.selectedBarber = b;
  }

  public selectBarber() {
    this.modal.close(this.selectedBarber);
  }

  
}
