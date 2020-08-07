import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class SalonUtilsService {

  constructor(private webService: WebService) { }

  getSalonOwners() {
    return this.webService.get('salonOwners');
  }

  getOneSalonOwner(ownerId: string) {
    console.log('LARRY ownerId= ' + ownerId);
    return this.webService.get(`salonOwners/${ownerId}`);
  }

  createSalonOwner(name: string) {
    console.log('Insert new salon Owner' + name);
    return this.webService.post('salonOwners', { name });
  }

  getSalons(ownerId: string) {
    console.log('LARRY ownerId= ' + ownerId);
    return this.webService.get(`salonOwners/${ownerId}/salons`);
  }

  createSalons(ownerId: string, name: string) {
    return this.webService.post( `salonOwners/${ownerId}/salons`, { name });
  }

  deleteSalonOwner(ownerId: string) {
    return this.webService.delete(`salonOwners/${ownerId}`);
  }

  deleteSalons(ownerId: string, salonId: string) {
    return this.webService.delete(`salonOwners/${ownerId}/salons/${salonId}`);
  }

}
