import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'app/module/global-constants';
import Product from 'app/module/product';
import productOrder from 'app/module/productOrder';
import SalonOwner from 'app/module/salonOwner';
import { SalonUtilsService } from 'app/salon-utils.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-orders-list-view',
  templateUrl: './product-orders-list-view.component.html',
  styleUrls: ['./product-orders-list-view.component.css']
})
export class ProductOrdersListViewComponent implements OnInit {

  public distributorId: string;  
  pOrders: productOrder[] = [];
  pOrders_procesing:  productOrder[] = [];
  pOrders_delivering:  productOrder[] = [];
  pOrders_complete:  productOrder[] = [];
  dbAddress: string;
  prefixPath: string;

  private roles: string[];
  isLoggedIn = false;
  user: any;
  isModifiedEnable = false;
  isAdmin = false;
  isSalonOwner = false;
  salonOwnerName: string[]=[];
  productName: string[]=[];

  keyword = 'value';
  selectedStatus:any;  
  orderStatus = GlobalConstants.OrderStatus;

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
      this.distributorId = this.user.id;
      this.isAdmin = this.user.roles.includes('ROLE_ADMIN');
      this.isSalonOwner = this.user.roles.includes('ROLE_SALON_OWNER');
    } else {
      // Not login yet
      return;
    }
    console.log(this.isSalonOwner);

    if (this.isAdmin) {
      this.route.params.subscribe((params: Params) => {
        console.log("PARAMS: ", params);
        if (params.distributorId) {
          // For admin controller
          this.distributorId = params.distributorId;        
          this.refreshOrderProductsList();
          return;
        }
      });
    }

    console.log('distributorId:');
    console.log(this.distributorId);
    // 2. Get distributorId
    this.salonUtilService.getDistributorIdFromUserId(this.distributorId).subscribe(
      (retDistributorId: string) => {
        this.distributorId = retDistributorId;
        console.log(this.distributorId);
        if (this.distributorId) {
          this.refreshOrderProductsList();
        } else {
          console.log("Can't find distributor Id");
        }            
      }
    );
    
       
    this.prefixPath = environment.baseUrl + this.router.url;    

    //console.log(this.prefixPath);
  }
  // --- Autocomplete Code --------------------------
  selectEvent(event){
    console.log(event);
    this.selectedStatus = event.value;
    
  }
  onChangeSearch(event){
    //console.log(event);        
  }
  handleEmptyInput(){
    this.selectedStatus = null;    
  }
  onFocused(event){
    //console.log(event);
  }
  // --- Autocomplete Code -------------------------
  refreshOrderProductsList() {
    
    this.salonUtilService.getProductOrderFromDistributorId(this.distributorId).subscribe(
      (pOrders: productOrder[]) => {
        this.pOrders = pOrders;
        
        for(let i = 0; i < this.pOrders.length; i++) {          
          this.salonUtilService.getOneSalonOwner(this.pOrders[i]._salonOwnerId).subscribe(
            (salonOwners: SalonOwner[]) => {
              this.salonOwnerName[i] = salonOwners[0].name;
            });
          this.salonUtilService.getOneProduct(this.pOrders[i]._productId).subscribe(
            (product: Product[]) => {
              this.productName[i] = product[0].name;
            });

          if ((!this.pOrders[i].event) || (this.pOrders[i].event=='null')) {
            this.pOrders[i].event = '-';
          }
          if ((!this.pOrders[i].discount) || (this.pOrders[i].discount == null)) {
            this.pOrders[i].discount = 0;
          }

          //move to 3 groups based on status
          if (this.pOrders[i].status === GlobalConstants.OrderStatus[0]) {
            this.pOrders_procesing.push(this.pOrders[i]);
          } else  if (this.pOrders[i].status === GlobalConstants.OrderStatus[1]) {
            this.pOrders_delivering.push(this.pOrders[i]);
          } else {
            this.pOrders_complete.push(this.pOrders[i]);
          }
        }
      }
    );
  }

  updateOrder(pOrder: productOrder) {
    //console.log(pOrder.status);
    this.salonUtilService.updateOrder(pOrder).subscribe();    
  }
}
