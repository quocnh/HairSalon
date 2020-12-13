import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import Product from 'app/module/product';
import User from 'app/module/user';
import { AddNewProductComponent } from 'app/popup/add-new-product/add-new-product.component';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

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
  dbAddress: string;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showSalonOwnerBoard = false;
  showDistributorBoard = false;
  username: string;
  user: any;

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.dbAddress = environment.dbAddress;
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      if (params.distributorId) {
        // For admin controller
        this.distributorId = params.distributorId;
        this.refreshProductsList();
        return;
      } else {
        //Get distributorId from userId
        // TODO ---------------------------------------------
        // Temporarily use: 5f32b794fb8a0e3838f226c7
        //this.distributorId = '5f32b794fb8a0e3838f226c7';
        //----------------------------------------------------
        // 1. Get userId
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
          console.log('LOGGED IN:');
          this.user = this.tokenStorageService.getUser();
          
        } else {
          // Not login yet
          return;
        }
        console.log('USER ID:');
        console.log(this.user.id);
        // 2. Get distributorId
        this.salonUtilService.getDistributorIdFromUserId(this.user.id).subscribe(
          (retDistributorId: string) => {
            this.distributorId = retDistributorId;
            console.log(this.distributorId);
            if (this.distributorId) {
              this.refreshProductsList();
            } else {
              console.log("Can't find distributor Id");
            }            
          }
        );
      }
    });
       
    this.prefixPath = environment.baseUrl + this.router.url;    

    console.log(this.prefixPath);
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
