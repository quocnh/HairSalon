import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Product from 'app/module/product';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  public product: Product = new Product();
  strProductPhoto: any;
  selectedFile: File = null;

  constructor(
    public modal: NgbActiveModal,
    private salonUtilService: SalonUtilsService,
    ) {}

  ngOnInit(): void {
    this.strProductPhoto = '../../../assets/img/no_photo_available.png';
  }

  addNewProduct() {
    console.log(this.product);

    this.modal.close([this.product, this,this.selectedFile]);
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
