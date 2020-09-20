import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  @Input() public itemName;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log('delete ' + this.itemName);
  }

}
