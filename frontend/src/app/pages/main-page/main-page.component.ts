import { Component, OnInit } from '@angular/core';
import Salon from '../../module/salon';
import { SalonUtilsService } from '../../salon-utils.service';


@Component({
  selector: 'app-main-page',
  moduleId: module.id,
  templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {

  salons: Salon[] = [];
  name: string;
  ownerId: string;
  isListAllSalons: boolean;
  public deletedSalon: Salon;

  constructor(
    private salonUtilService: SalonUtilsService,
    ) { }

  ngOnInit(): void {
    this.refreshAllSalonList();
  }

  refreshAllSalonList() {
    this.salonUtilService.getAllSalons().subscribe((salons: Salon[]) => this.salons = salons);
  }

}
