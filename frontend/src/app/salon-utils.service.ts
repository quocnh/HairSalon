import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class SalonUtilsService {

  constructor(private webService: WebService) { }

  // Salon Owner
  getSalonOwners() {
    return this.webService.get('salonOwners');
  }

  getOneSalonOwner(ownerId: string) {
    return this.webService.get(`salonOwners/${ownerId}`);
  }

  createSalonOwner(name: string) {
    console.log('Create a new salon Owner: ' + name);
    return this.webService.post('salonOwners', { name });
  }

  deleteSalonOwner(ownerId: string) {
    return this.webService.delete(`salonOwners/${ownerId}`);
  }

  // Salon
  getSalons(ownerId: string) {
    console.log('Get Salons from ownerId:' + ownerId);
    return this.webService.get(`salonOwners/${ownerId}/salons`);
  }

  getOneSalon(ownerId: string, salonId: string) {
    return this.webService.get(`salonOwners/${ownerId}/salons/${salonId}`);
  }

  createSalons(ownerId: string, name: string) {
    return this.webService.post( `salonOwners/${ownerId}/salons`, { name });
  }

  deleteSalons(ownerId: string, salonId: string) {
    return this.webService.delete(`salonOwners/${ownerId}/salons/${salonId}`);
  }

  // Customer
  getCustomers() {
    return this.webService.get(`customers`);
  }

  getOneCustomer(customerId: string) {
    return this.webService.get(`customers/${customerId}`);
  }

  createCustomer(name: string) {
    return this.webService.post( `customers`, { name });
  }

  deleteCustomers(customerId: string) {
    return this.webService.delete(`customers/${customerId}`);
  }
}
