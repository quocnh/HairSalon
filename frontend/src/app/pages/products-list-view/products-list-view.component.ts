import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Product from 'app/module/product';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.css']
})
export class ProductsListViewComponent implements OnInit {
  distributorId: string;
  prefixPath: string;
  products: Product[] = [];

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    //Get ownerId from login page
    // TODO ---------------------------------------------
    // Temporarily use: 5f32b794fb8a0e3838f226c7
    this.distributorId = '5f32b794fb8a0e3838f226c7';
    //----------------------------------------------------

    
    this.refreshProductsList();
      
    this.prefixPath = this.router.url;
  }
/*
  createNewSalon() {
    console.log('Create new salon');
    // TODO: Implement create new salon owner form popup
    const ref = this.modalService.open(AddNewSalonComponent);

    ref.result.then((result) => {
      if (result) {
        console.log('RESULT: added salon name' + result.name);
        this.addedSalon = result;
        console.log('RESULT: owner salon id' + this.addedSalon._salonOwnerId);
        this.addedSalon.rate = 0;
        this.addedSalon.numRate = 0;
        if (this.isListAllSalons) {
          // Case list all salons from admin account
          if ((this.addedSalon.name !== null) && (this.addedSalon._salonOwnerId !== null)) {
            console.log('Create Salon from admin');
            if (this.addedSalon.address !== null) {
              this.salonUtilService.getAddressfromHERE(this.addedSalon.address).subscribe(
                (resposne: any) => {
                  console.log(resposne.items[0].position);
                  this.addedSalon.longitude = resposne.items[0].position.lng;
                  this.addedSalon.latitude = resposne.items[0].position.lat;

                  // create salon
                  this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
                    () => this.refreshAllSalonList()
                  );
                }
              )
            } else {
              this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
                () => this.refreshAllSalonList()
              );
            }
          }
        } else if ((this.addedSalon.name !== null) && (this.ownerId !== null)) {
          // Case add salon from owner account
          console.log('Create Salon from owner');
          this.salonUtilService.createSalons(this.addedSalon, null).subscribe(
            () => this.refreshSalonList()
          );

        }
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

  deleteSalon(salonId: string) {
    // TODO: Implement create new salon owner form popup

    this.salonUtilService.getOneSalon(salonId)
      .subscribe((salons: Salon[]) =>  {
        this.deletedSalon = salons[0];
        console.log('Delete salon name ' + this.deletedSalon.name);
        const ref = this.modalService.open(DeleteSalonComponent);
        ref.componentInstance.deletedSalon = this.deletedSalon;
        ref.result.then((yes) => {
          this.salonUtilService.deleteSalons(salonId).subscribe(
            () => {
                if (this.isListAllSalons) {
                  this.refreshAllSalonList();
                } else {
                  this.refreshSalonList();
                }
              }
          );

        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }
*/
  refreshProductsList() {
    this.salonUtilService.getProductsFromDistributorId(this.distributorId).subscribe(
      (products: Product[]) => this.products = products
    );
  }

  createNewProduct() {
    console.log("Create product");
  }

}
