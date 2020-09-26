import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';
import SalonOwner from '../../module/salonOwner';

@Component({
  selector: 'app-add-new-salon',
  templateUrl: './add-new-salon.component.html',
  styleUrls: ['./add-new-salon.component.css']
})
export class AddNewSalonComponent implements OnInit {

  public salon: Salon = new Salon();
  salonOwners: SalonOwner[];
  chosenSalonOwner: SalonOwner;

  constructor(
    public modal: NgbActiveModal,
    private salonUtilService: SalonUtilsService,
    ) {}

  ngOnInit(): void {
    console.log('Load modal');
    this.salonUtilService.getSalonOwners().subscribe((salonOwners: SalonOwner[]) => this.salonOwners = salonOwners);
  }

  addNewSalon() {
    console.log(this.salon.name);
    console.log(this.chosenSalonOwner.name);
    this.salon._salonOwnerId = this.chosenSalonOwner._id;
    this.modal.close(this.salon);
  }

}
