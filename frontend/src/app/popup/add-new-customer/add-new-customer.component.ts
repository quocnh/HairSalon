import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Customer from '../../module/customer';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  public customer: Customer = new Customer();
  firstName: string;
  lastName: string;
  city: string;
  district: string;
  address: string;

  constructor(
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewCustomer() {
    this.getCustomerInfo();
    console.log(this.customer);
    this.modal.close(this.customer);
  }

  getCustomerInfo() {
    this.customer.fullname = this.firstName + ' ' + this.lastName;
  }

}
