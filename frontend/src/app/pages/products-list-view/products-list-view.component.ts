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
  isModifiedEnable = false;
  isAdmin = false;
  isSalonOwner = false;

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.dbAddress = environment.dbAddress;

    // 1. Get userId
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {      
      this.user = this.tokenStorageService.getUser();
      console.log('LOGGED IN:' +  this.user.roles);
      this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }
    console.log(this.isSalonOwner);

    if ((this.isAdmin) || (this.isSalonOwner)) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        if (params.distributorId) {
          // For admin controller
          this.distributorId = params.distributorId;        
          this.refreshProductsList();
          return;
        }
      });
    }

    console.log('distributorId:');
    console.log(this.distributorId);
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
