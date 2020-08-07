import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-salon',
  templateUrl: './add-new-salon.component.html',
  styleUrls: ['./add-new-salon.component.css']
})
export class AddNewSalonComponent implements OnInit {

  addedSalonName: string;

  constructor(
    public modal: NgbActiveModal,
    ) {}

  ngOnInit(): void {
    console.log('Load modal');
  }

  addNewSalon() {
    console.log(this.addedSalonName);
    this.modal.close(this.addedSalonName);
  }

}
