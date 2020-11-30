import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-any',
  templateUrl: './delete-any.component.html',
  styleUrls: ['./delete-any.component.css']
})
export class DeleteAnyComponent implements OnInit {

  @Input() public deletedText;
  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
