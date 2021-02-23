import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm_productOrder',
  templateUrl: './confirm_productOrder.component.html',
  styleUrls: ['./confirm_productOrder.component.css']
})
export class confirmProductOrderComponent implements OnInit {
  @Input() public productOrder;
  @Input() public totalPrice;
  @Input() public distributorName;
  @Input() public productName;
  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    //console.log(this.productOrder);
  }

}
