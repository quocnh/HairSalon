import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() public confirmInfo;
  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.confirmInfo);
  }

}
