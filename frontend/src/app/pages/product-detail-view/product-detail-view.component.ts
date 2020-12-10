import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import { GlobalConstants } from 'app/module/global-constants';
import Product from 'app/module/product';
import { DeleteAnyComponent } from 'app/popup/delete-any/delete-any.component';
import { SalonUtilsService } from 'app/salon-utils.service';
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
  constructor(
      private salonUtilService: SalonUtilsService,
      private route: ActivatedRoute,
      private http: HttpClient,
      private calendar: NgbCalendar,
      private ngbDateParserFormatter: NgbDateParserFormatter,
      private modalService: NgbModal,
      private router: Router,
      ) { }

  ngOnInit() {
      //this.strAvatar = 'assets/img/default-avatar.png';     
      
      this.strPhotos[0] = 'assets/img/default-avatar.png';      
      this.strPhotos[1] = 'null';
      this.strPhotos[2] = 'null';
      this.strPhotos[3] = 'null';
      this.strPhotos[4] = 'null';
      this.strPhotos[5] = 'null';

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
}
