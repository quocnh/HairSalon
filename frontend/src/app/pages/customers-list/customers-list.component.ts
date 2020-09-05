import { Component, OnInit } from '@angular/core';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Customer from '../../module/customer';
import { AddNewCustomerComponent } from '../../popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../../popup/delete-customer/delete-customer.component';

@Component({
  selector: 'app-customers-list',
  moduleId: module.id,
  templateUrl: 'customers-list.component.html',
})
export class CustomersListComponent implements OnInit {

  customers: Customer[];
  addedcustomer: Customer;
  customer: Customer;
  name: string;
  public itemName: string;
  deletedCustomer: Customer;
  addedCustomer: Customer = new Customer();

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.refreshCustomerList();
  }

  createNewCustomer() {
    // TODO: Implement create new customer form popup
    const ref = this.modalService.open(AddNewCustomerComponent);

    ref.result.then((result) => {
      if (result) {
        console.log(result);

        this.addedCustomer.username = result.username;
        this.addedCustomer.firstname = result.firstname;
        this.addedCustomer.lastname = result.lastname;
        this.addedCustomer.phone = result.phone;
        this.addedCustomer.email = result.email;
        this.addedCustomer.dob = result.dob;
        this.addedCustomer.gender = result.gender;
        this.addedCustomer.city = result.city;
        this.addedCustomer.district = result.district;
        this.addedCustomer.address = result.address;

        this.salonUtilService.createCustomer(this.addedCustomer, null).subscribe();
        this.refreshCustomerList();
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteCustomer(customerId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getOneCustomer(customerId)
      .subscribe((customers: Customer[]) =>  {
        this.deletedCustomer = customers[0];
        console.log('Delete customer ' + this.deletedCustomer.username);
        const ref = this.modalService.open(DeleteCustomerComponent);
        ref.componentInstance.itemName = this.deletedCustomer.username;
        ref.result.then((yes) => {
          this.salonUtilService.deleteCustomers(customerId).subscribe();
          this.refreshCustomerList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshCustomerList() {
    this.salonUtilService.getCustomers()
      .subscribe((customers: Customer[]) => this.customers = customers);
  }
}
