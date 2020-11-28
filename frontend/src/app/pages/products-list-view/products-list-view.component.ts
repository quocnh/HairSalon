import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Product from 'app/module/product';
import { AddNewProductComponent } from 'app/popup/add-new-product/add-new-product.component';
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
  addedProduct: Product;
  productPhoto: File;

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
    console.log('Create new product');
    // TODO: Implement create new product form popup
    const ref = this.modalService.open(AddNewProductComponent);

    ref.result.then((result) => {
      console.log('Result: ' + result);
      console.log('Result 0: ' + result[0]);
      console.log('Result 1: ' + result[1]);
      this.productPhoto = result[1];
      console.log('this.productPhoto: ' + this.productPhoto);
      if (result[0]) {
        console.log('RESULT: added product name' + result[0].name);
        this.addedProduct = result[0];
        
        if (this.addedProduct.name !== null)  {
          // Case add salon from owner account
          console.log('Create Product from distributorId');
          this.salonUtilService.createProduct(this.addedProduct, this.productPhoto).subscribe(
            () => this.refreshProductsList()
          );

        }
      }
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

}
