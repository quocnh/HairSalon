import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import SalonOwner from '../../module/salonOwner';
import { SalonUtilsService } from '../../salon-utils.service';

@Component({
  selector: 'app-add-new-salon-owner',
  templateUrl: './add-new-salon-owner.component.html',
  styleUrls: ['./add-new-salon-owner.component.css']
})
export class AddNewSalonOwnerComponent implements OnInit {
  salonOwner: SalonOwner;
  addedSalonName: string;

  constructor(
    public modal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewSalonOwner() {
    // this.salonOwner.name = this.ownerName;
    console.log(this.addedSalonName);
    this.modal.close(this.addedSalonName);
  }

}
