import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import Product from 'app/module/product';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit {

  productId: string;
  productDb: Product = new Product();
  product: Product = new Product();
  strAvatar: any;
  distributorName: string;

  selectedFile: File = null;
  today = this.calendar.getToday();

  constructor(
      private salonUtilService: SalonUtilsService,
      private route: ActivatedRoute,
      private http: HttpClient,
      private calendar: NgbCalendar,
      private ngbDateParserFormatter: NgbDateParserFormatter,
      ) { }

  ngOnInit() {
      this.strAvatar = 'assets/img/default-avatar.png';
      this.route.params.subscribe((params: Params) => {
          console.log(params);
          this.productId = params.productId;
          if (this.productId) {
              this.refreshProductProfile(this.productId);
          }

      });
  }

  updateProductProfile() {
    if ((JSON.stringify(this.productDb) !== JSON.stringify(this.product)) || (this.selectedFile !== null)) {
        // console.log('Khac' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
        // update user profile
        this.salonUtilService.updateProduct(this.product, this.selectedFile).subscribe(
            () => // refresh page
            this.refreshProductProfile(this.productId)
        );
    } else {
        // console.log('Giong' + JSON.stringify(this.customerDb) + '---' + JSON.stringify(this.customer));
    }
  }

  refreshProductProfile(productId) {
    console.log(productId);
    this.salonUtilService.getOneProduct(productId).subscribe(
        (product: Product) => {
          console.log(product);   
            this.product = Object.assign({}, product[0]);
            this.productDb = Object.assign({}, product[0]);
            if (this.product.photos[0]) {
                this.strAvatar = 'http://localhost:3000/' + this.product.photos[0];
            }
            console.log(this.strAvatar);              

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

  onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = (_event) => {
            this.strAvatar = reader.result;
        }
        console.log(this.selectedFile);
  }
}
