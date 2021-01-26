import { SalonUtilsService } from '../../salon-utils.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import User from '../../module/user';
import { AddNewCustomerComponent } from '../../popup/add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../../popup/delete-customer/delete-customer.component';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  moduleId: module.id,
  templateUrl: 'customers-list.component.html',
})
export class CustomersListComponent implements OnInit {

  customers: User[];
  addedcustomer: User;
  customer: User;
  name: string;
  public itemName: string;
  public objectName: string;
  deletedCustomer: User;
  addedCustomer: User = new User();
  prefixPath: string;
  
  keyword = 'username';
  selectedCustomer:any;
  displayedCustomers: User[] = [];

  constructor(
    private salonUtilService: SalonUtilsService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.prefixPath = environment.baseUrl + this.router.url;
    this.refreshCustomerList();
  }

  // --- Autocomplete Code --------------------------
  selectEvent(event){
    console.log(event);
    this.selectedCustomer = event;
    this.displayedCustomers = [];
    this.displayedCustomers.push(this.selectedCustomer);
  }
  onChangeSearch(event){
    //console.log(event);        
  }
  handleEmptyInput(){
    this.selectedCustomer = null;
    this.displayedCustomers = this.customers;
  }
  onFocused(event){
    //console.log(event);
  }
  // --- Autocomplete Code -------------------------

  createNewCustomer() {
    // TODO: Implement create new customer form popup
    // const ref = this.modalService.open(AddNewCustomerComponent);
    // ref.componentInstance.objectName = 'customer';
    // ref.result.then((result) => {
    //   if (result) {
    //     console.log(result);

    //     this.addedCustomer.username = result.username;
    //     this.addedCustomer.firstname = result.firstname;
    //     this.addedCustomer.lastname = result.lastname;
    //     this.addedCustomer.phone = result.phone;
    //     this.addedCustomer.email = result.email;
    //     this.addedCustomer.dob = result.dob;
    //     this.addedCustomer.gender = result.gender;
    //     this.addedCustomer.city = result.city;
    //     this.addedCustomer.district = result.district;
    //     this.addedCustomer.address = result.address;

    //     this.salonUtilService.createCustomer(this.addedCustomer, null).subscribe();
    //     this.refreshCustomerList();
    //   }
    // },
    // (cancel) => {
    //   console.log('cancel click');
    // })
    console.log('Not support yet');
  }

  deleteCustomer(customerId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getUser(customerId)
      .subscribe((customers: User[]) =>  {
        this.deletedCustomer = customers[0];
        console.log('Delete customer ' + this.deletedCustomer.username);
        const ref = this.modalService.open(DeleteCustomerComponent);
        ref.componentInstance.itemName = this.deletedCustomer.username;
        ref.result.then((yes) => {
          this.salonUtilService.deleteUser(customerId).subscribe();
          this.refreshCustomerList();
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  refreshCustomerList() {
    this.salonUtilService.getAllCustomer()
      .subscribe((customers: User[]) => 
      {
        this.customers = customers;
        this.displayedCustomers = this.customers;
      });
  }
}
