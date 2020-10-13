import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import Barber from '../../module/barber';
import Salon from '../../module/salon';
import { AddNewCustomerComponent } from '../../popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../../popup/delete-customer/delete-customer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';

@Component({
  selector: 'app-barber-view',
  moduleId: module.id,
  templateUrl: './barber-view.component.html',
})
export class BarberViewComponent implements OnInit {

  barbers: Barber[];
  customer: Barber;
  name: string;
  public itemName: string;
  public deletedBarber: Barber;
  addedBarber: Barber = new Barber();
  public objectName: string;
  salon: Salon = new Salon();

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.refreshBarberList();
  }

  createNewBarber() {
    // TODO: Implement create new customer form popup
    const ref = this.modalService.open(AddNewCustomerComponent);
    ref.componentInstance.objectName = 'barber';
    ref.result.then((result) => {
      if (result) {
        console.log(result);

        this.addedBarber.firstname = result.firstname;
        this.addedBarber.username = result.username;
        this.addedBarber.lastname = result.lastname;
        this.addedBarber.phone = result.phone;
        this.addedBarber.email = result.email;
        this.addedBarber.dob = result.dob;
        this.addedBarber.gender = result.gender;
        this.addedBarber.profile = result.profile;
        this.addedBarber._salonId = result._salonId;

        this.salonUtilService.createBarber(this.addedBarber, null).subscribe(
          (yes) => this.refreshBarberList()
        );
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteBarber(barberId: string) {

    this.salonUtilService.getOneBarber(barberId)
      .subscribe((barbers: Barber[]) =>  {
        this.deletedBarber = barbers[0];
        console.log('Delete barber ' + this.deletedBarber.username);

        // display notice popup
        const ref = this.modalService.open(DeleteCustomerComponent);
        ref.componentInstance.itemName = this.deletedBarber.username;

        // delete barber
        ref.result.then((yes) => {
          this.salonUtilService.deleteBarber(barberId).subscribe(
            () => this.refreshBarberList()
          );
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshBarberList() {
    this.salonUtilService.getBarbers()
      .subscribe((barbers: Barber[]) => {
        this.barbers = barbers;
        for (let i = 0; i < barbers.length; i++) {
          this.getSalonName(barbers[i]._salonId).then(data => (barbers[i].salonName = data));
        }
      });
  }

  async getSalonName(salonId: string): Promise<string> {
    let salonName = 'undefined';
    await this.salonUtilService.getOneSalon(salonId)
    .toPromise()
    .then(
      (salons: Salon) => {
        return salons[0].name;
      }).then(data => salonName = data);
    return salonName;
  }




}
