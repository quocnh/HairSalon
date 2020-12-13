import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import { GlobalConstants } from 'app/module/global-constants';
import Product from 'app/module/product';
import { DeleteAnyComponent } from 'app/popup/delete-any/delete-any.component';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-detail-edit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.css']
})
export class ProductDetailEditComponent implements OnInit {
  productId: string;
  productDb: Product = new Product();
  product: Product = new Product();
  public deletedText: string;
  distributorName: string;
  selectedFiles: any = new Array(6);
  strPhotos: any = new Array(6);

  today = this.calendar.getToday();
  Category = GlobalConstants.ProductCategory;
  Unit = GlobalConstants.ProductUnit;
  isModifiedEnable = false;
  isLoggedIn = false;
  user: any;
  
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
      this.strPhotos[0] = 'assets/img/default-avatar.png';
      
      this.strPhotos[1] = 'assets/img/no_photo_available.png';
      this.strPhotos[2] = 'assets/img/no_photo_available.png';
      this.strPhotos[3] = 'assets/img/no_photo_available.png';
      this.strPhotos[4] = 'assets/img/no_photo_available.png';
      this.strPhotos[5] = 'assets/img/no_photo_available.png';

      // 1. Get userId
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {      
        this.user = this.tokenStorageService.getUser();
        console.log('LOGGED IN:' +  this.user.roles);
        this.isModifiedEnable = this.user.roles.includes('ROLE_DISTRIBUTOR') || this.user.roles.includes('ROLE_ADMIN');
      } else {
        // Not login yet
        console.log("Please log in as distributor or admin");
        return;
      }
      if (!this.isModifiedEnable) {
        console.log("Please log in as distributor or admin");
        return;
      }
      this.route.params.subscribe((params: Params) => {
          //console.log(params);
          this.productId = params.productId;
          if (this.productId) {
              this.refreshProductProfile(this.productId);
          }

      });
  }

  updateProduct() {
    if ((JSON.stringify(this.productDb) !== JSON.stringify(this.product)) || (this.selectedFiles !== null)) {        
        // update user profile
        this.salonUtilService.updateProduct(this.product, this.selectedFiles).subscribe(
            () => // refresh page
            this.refreshProductProfile(this.productId)
        );
    } else {
        // console.log('Giong' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
    }
  }

  deleteProduct(productId: string) {
    // TODO: Implement create new salon owner form popup
    this.deletedText = 'sản phẩm '+ this.product.name;
    console.log('Delete Product name ' + this.deletedText);
    const ref = this.modalService.open(DeleteAnyComponent);
    ref.componentInstance.deletedText = this.deletedText;
    ref.result.then(
      (yes) => {
        this.salonUtilService.deleteProduct(this.productId).subscribe(
          () => {
            this.router.navigate(['../'], { relativeTo: this.route });
            }
        );
      },
      (cancel) => {
        console.log('cancel click');
      }
    )
  }

  refreshProductProfile(productId) {
    //console.log(productId);
    this.salonUtilService.getOneProduct(productId).subscribe(
        (product: Product) => {
          console.log(product);   
            this.product = Object.assign({}, product[0]);
            this.productDb = Object.assign({}, product[0]);
            for (let i = 0; i < this.product.photos.length; i ++) {
              if ((this.product.photos[i] !== 'null') && (this.product.photos[i])) {
                this.strPhotos[i] = environment.dbAddress + '/' + this.product.photos[i];
              }
              
            }
            for (let i = 0; i < this.selectedFiles.length; i ++) {
              this.selectedFiles[i] = null;
            }

            // get distributor name from distributor Id
            //console.log(this.product._distributorId);
            if (this.product._distributorId) {
              this.salonUtilService.getOneDistributor(this.product._distributorId).subscribe(
                (distributor: Distributor) => {
                    this.distributorName = distributor[0].name;
                    //console.log(this.distributorName);
                });
            }
        });

  }

  onFileSelected(event, idx) {
      this.selectedFiles[idx] = event.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(this.selectedFiles[idx]);
        reader.onload = (_event) => {
            this.strPhotos[idx] = reader.result;
        }
        console.log(this.selectedFiles[idx]);
  }

  deletePhoto(idx) {
    this.strPhotos[idx] = 'assets/img/no_photo_available.png';
    this.product.photos[idx] = 'null';
  }

}
