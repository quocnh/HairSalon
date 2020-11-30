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
  public distributorId: string;
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

  refreshProductsList() {
    
    this.salonUtilService.getProductsFromDistributorId(this.distributorId).subscribe(
      (retProducts: Product[]) => {
        this.products = retProducts;        
      }
    );
  }

  createNewProduct() {
    console.log('Create new product');
    // TODO: Implement create new product form popup
    const ref = this.modalService.open(AddNewProductComponent);
    ref.componentInstance.distributorId = this.distributorId;
    
    ref.result.then((result) => {
      this.refreshProductsList()
    },
    (cancel) => {
      console.log('cancel click');
    })
  }

}
