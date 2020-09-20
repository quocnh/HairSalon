import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from '../../module/salon';

@Component({
  selector: 'app-add-new-salon',
  templateUrl: './add-new-salon.component.html',
  styleUrls: ['./add-new-salon.component.css']
})
export class AddNewSalonComponent implements OnInit {

  addedSalonName: string;
  public salon: Salon = new Salon();
  constructor(
    public modal: NgbActiveModal,
    ) {}

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewSalon() {
    console.log(this.addedSalonName);
    this.modal.close(this.salon);
  }

}
