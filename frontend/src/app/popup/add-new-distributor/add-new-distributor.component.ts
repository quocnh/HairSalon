import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from '../../module/distributor';

@Component({
  selector: 'app-add-new-distributor',
  templateUrl: './add-new-distributor.component.html',
  styleUrls: ['./add-new-distributor.component.css']
})
export class AddNewDistributorComponent implements OnInit {

  distributor: Distributor;
  addedDistributorName: string;

  constructor(
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewCustomer() {
    // this.salonOwner.name = this.ownerName;
    console.log(this.addedDistributorName);
    this.modal.close(this.addedDistributorName);
  }

}
