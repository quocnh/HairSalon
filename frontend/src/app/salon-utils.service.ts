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

  createSalonOwner(name: string) {
    console.log('Insert new salon Owner' + name);
    return this.webService.post('salonOwners', { name });
  }

  getSalons(ownerId: string) {
    console.log('LARRY ownerId= ' + ownerId);
    return this.webService.get(`salonOwners/${ownerId}/salons`);
  }

  createTasks(ownerId: string, name: string) {
    return this.webService.post( `salonOwners/${ownerId}/salons`, { name });
  }

  deleteList(ownerId: string) {
    return this.webService.delete(`salonOwners/${ownerId}`);
  }

  deleteTask(ownerId: string, salonId: string) {
    return this.webService.delete(`salonOwners/${ownerId}/salons/${salonId}`);
  }

}
