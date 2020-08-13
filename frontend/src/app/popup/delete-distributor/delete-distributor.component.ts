import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-distributor',
  templateUrl: './delete-distributor.component.html',
  styleUrls: ['./delete-distributor.component.css']
})
export class DeleteDistributorComponent implements OnInit {

  @Input() public deletedDistributor;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
