import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-salon-owner',
  templateUrl: './delete-salon-owner.component.html',
  styleUrls: ['./delete-salon-owner.component.css'],
})
export class DeleteSalonOwnerComponent implements OnInit {
  @Input() public deletedSalonOwner;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
