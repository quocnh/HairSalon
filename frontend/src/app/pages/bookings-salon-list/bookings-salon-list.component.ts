import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Salon from 'app/module/salon';
import { SalonUtilsService } from 'app/salon-utils.service';

@Component({
  selector: 'app-bookings-salon-list',
  templateUrl: './bookings-salon-list.component.html',
  styleUrls: ['./bookings-salon-list.component.css']
})
export class BookingsSalonListComponent implements OnInit {

  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;
  addedSalon: Salon = new Salon();
  prefixPath: string;

  constructor(
    private salonUtilService: SalonUtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    //Get ownerId from login page
    // TODO ---------------------------------------------
    // Temporarily use larry: 5f2df3fb4d702c4030b3f856
    this.ownerId = '5f2df3fb4d702c4030b3f856';
    //----------------------------------------------------

    this.refreshSalonList();
    this.isListAllSalons = false;

    this.prefixPath = this.router.url;
    //console.log(this.prefixPath);
    /*
    this.route.params.subscribe((param: Params) => {
      this.ownerId = param.ownerId;
      if (!this.ownerId) {
        this.isListAllSalons = true;
        this.refreshAllSalonList();
      } else {
        this.refreshSalonList();
        this.isListAllSalons = false;
      }
    });
    */
  }

  refreshSalonList() {
    this.salonUtilService.getSalonsFromOwnerId(this.ownerId).subscribe((salons: Salon[]) => this.salons = salons);
  }

}
