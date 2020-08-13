import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-salon',
  templateUrl: './delete-salon.component.html',
  styleUrls: ['./delete-salon.component.css']
})
export class DeleteSalonComponent implements OnInit {

  @Input() public deletedSalon;
  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
