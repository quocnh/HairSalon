import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import Barber from '../../module/barber';
import { AddNewCustomerComponent } from '../../popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../../popup/delete-customer/delete-customer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

        this.salonUtilService.createBarber(this.addedBarber, null).subscribe();
        this.refreshBarberList();
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
          this.salonUtilService.deleteBarber(barberId).subscribe();
          this.refreshBarberList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshBarberList() {
    this.salonUtilService.getBarbers()
      .subscribe((barbers: Barber[]) => this.barbers = barbers);
  }

}
