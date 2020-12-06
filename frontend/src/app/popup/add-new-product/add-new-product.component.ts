import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Distributor from 'app/module/distributor';
import { GlobalConstants } from 'app/module/global-constants';
import Product from 'app/module/product';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  @Input() public distributorId;
  public product: Product = new Product();
  strProductPhoto: any;
  selectedFile: File = null;
  Category = GlobalConstants.ProductCategory;
  Unit = GlobalConstants.ProductUnit;
  constructor(
    public modal: NgbActiveModal,
    private salonUtilService: SalonUtilsService,
    ) {}

  ngOnInit(): void {
    console.log('Create Product from distributorId: ' + this.distributorId);
    this.strProductPhoto = '../../../assets/img/no_photo_available.png';
  }

  addNewProduct() {
    this.product._distributorId = this.distributorId;
    this.product.event = '';
    console.log(this.product);

    this.salonUtilService.getOneDistributor(this.distributorId).subscribe(
      (distributor:Distributor) => {
        this.product._distributorName = distributor[0].name;
        if (this.product.name) {
          console.log('RESULT: added product name: ' + this.product.name);
               
          this.salonUtilService.createProduct(this.product, this.selectedFile).subscribe(
            () => this.modal.close(this.product)
          );
    
        }
      }
    );
    
    
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
          this.strProductPhoto = reader.result;
      }
      console.log(this.selectedFile);
}

}
