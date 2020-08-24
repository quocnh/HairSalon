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

  constructor(
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewCustomer() {
    console.log(this.customer);
    this.modal.close(this.customer);
  }

}
