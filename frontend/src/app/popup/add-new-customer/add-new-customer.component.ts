import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import Customer from '../../module/customer';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  public customer: Customer = new Customer();

  model: NgbDateStruct;
  today = this.calendar.getToday();

  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    ) { }

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewCustomer() {
    this.customer.dob = this.ngbDateParserFormatter.format(this.model);
    console.log(this.customer);
    this.modal.close(this.customer);
  }

}
