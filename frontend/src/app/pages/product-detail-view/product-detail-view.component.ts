import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import { GlobalConstants } from 'app/module/global-constants';
import Product from 'app/module/product';
import productOrder from 'app/module/productOrder';
import { DeleteAnyComponent } from 'app/popup/delete-any/delete-any.component';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit {

  productId: string;
  productDb: Product = new Product();
  product: Product = new Product();
  public deletedText: string;
  //strAvatar: any;
  strPhotos: any = Array(6);
  distributorName: string;

  selectedFile: File = null;
  today = this.calendar.getToday();
  Category = GlobalConstants.ProductCategory;
  Unit = GlobalConstants.ProductUnit;
  isShownEnable = false;
  isLoggedIn = false;
  user: any;
  orderedQuantity = 0;
  pOrder: productOrder = new productOrder();

  constructor(
      private salonUtilService: SalonUtilsService,
      private route: ActivatedRoute,
      private http: HttpClient,
      private calendar: NgbCalendar,
      private ngbDateParserFormatter: NgbDateParserFormatter,
      private modalService: NgbModal,
      private router: Router,
      private tokenStorageService: TokenStorageService
      ) { }

  ngOnInit() {
      //this.strAvatar = 'assets/img/default-avatar.png';     
      
      this.strPhotos[0] = 'assets/img/default-avatar.png';      
      this.strPhotos[1] = 'null';
      this.strPhotos[2] = 'null';
      this.strPhotos[3] = 'null';
      this.strPhotos[4] = 'null';
      this.strPhotos[5] = 'null';
      this.pOrder.quantity = 0;

      // 1. Get userId
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {      
        this.user = this.tokenStorageService.getUser();
        console.log('LOGGED IN:' +  this.user.roles);
        this.isShownEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') 
                                || this.user.roles.includes('ROLE_ADMIN') 
                                || this.user.roles.includes('ROLE_SALON_OWNER');
      } else {
        // Not login yet
        console.log("Please log in as salonOwner or admin");
        return;
      }
      if (!this.isShownEnable) {
        console.log("Please log in as salonOwner or admin");
        return;
      }

      this.route.params.subscribe((params: Params) => {
          console.log(params);
          this.productId = params.productId;
          if (this.productId) {
              this.refreshProductProfile(this.productId);
          }

      });
  }

  refreshProductProfile(productId) {
    console.log(productId);
    this.salonUtilService.getOneProduct(productId).subscribe(
        (product: Product) => {
          console.log(product);   
            this.product = Object.assign({}, product[0]);
            this.productDb = Object.assign({}, product[0]);
            for (let i = 0; i < this.product.photos.length; i++) {
              if (this.product.photos[i]) {
                this.strPhotos[i] = environment.dbAddress + '/' + this.product.photos[i];
              }
            }
            
            //console.log(this.strAvatar);

            // get distributor name from distributor Id
            console.log(this.product._distributorId);
            if (this.product._distributorId) {
              this.salonUtilService.getOneDistributor(this.product._distributorId).subscribe(
                (distributor: Distributor) => {
                    this.distributorName = distributor[0].name;
                    console.log(this.distributorName);
                });
            }
        });
  }

  orderProduct() {
    this.pOrder.status = "processing";
    this.pOrder._productId = this.productDb._id;
    this.pOrder._distributorId = this.productDb._distributorId;
    this.pOrder.totalPrice = this.pOrder.quantity*this.productDb.price*((100-this.productDb.discount)/100);
    this.pOrder.paidAmount = 0;
    this.pOrder.discount = this.productDb.discount;
    this.pOrder.event = this.productDb.event;

    this.salonUtilService.getSalonOwnerIdFromUserId(this.user.id).subscribe(
      (retOwnerId: string) => {
        this.pOrder._salonOwnerId = retOwnerId;
        //console.log(this.pOrder);
        this.salonUtilService.createNewProductOrder(this.pOrder).subscribe(
          (pOrder: productOrder) => {            
          });
      }
    );

  }
}
