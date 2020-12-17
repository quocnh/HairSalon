import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SalonUtilsService } from 'app/salon-utils.service';
import Distributor from '../../module/distributor';

@Component({
  selector: 'app-add-new-distributor',
  templateUrl: './add-new-distributor.component.html',
  styleUrls: ['./add-new-distributor.component.css']
})
export class AddNewDistributorComponent implements OnInit {

  public distributor: Distributor = new Distributor();

  username: string;
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  dob: string;
  gender: string;
  district: string;
  city: string;
  address: string;
  avatar: string;

  genders = [
    {value: 'Nam'},
    {value: 'Nữ'},
    {value: 'Khác'}
  ];

  modelDob: NgbDateStruct;
  today = this.calendar.getToday();

  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    ) { }

  ngOnInit(): void {

  }

  addNewDistributor() {

    //this.distributor.dob = this.ngbDateParserFormatter.format(this.modelDob);
    this.distributor.firstname = this.firstname;
    this.distributor.lastname = this.lastname;
    this.distributor.phone = this.phone;
    // this.distributor.email = this.email;
    //this.distributor.gender = this.gender;

    console.log(this.distributor);
    this.modal.close(this.distributor);    

  }

}
