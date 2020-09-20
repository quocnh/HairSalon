import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Customer from './module/customer';
import Salon from './module/salon';
import Barber from './module/barber';

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
  getSalonsFromOwnerId(ownerId: string) {
    console.log('Get Salons from ownerId:' + ownerId);
    return this.webService.get(`salonOwners/${ownerId}/salons`);
  }

  getAllSalons() {
    console.log('Get all Salons');
    return this.webService.get(`salons`);
  }

  getOneSalonFromOwner(ownerId: string, salonId: string) {
    return this.webService.get(`salonOwners/${ownerId}/salons/${salonId}`);
  }

  getOneSalon(salonId: string) {
    return this.webService.get(`salons/${salonId}`);
  }

  createSalons(ownerId: string, salon: Salon) {
    const fd = new FormData();
    let key;
    // if (file) {
    //  fd.append('avatar', file, file.name);
    // }

    // tslint:disable-next-line: forin
    for (key in salon) {
      fd.append(key, salon[key]);
    }
    console.log('create Salon : ' + salon.name);
    return this.webService.post( `salonOwners/${ownerId}/salons`, fd);
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

  createCustomer(customer: Customer, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in customer) {
      fd.append(key, customer[key]);
    }
    console.log('create Customer : ' + customer.username);
    return this.webService.post( `customers`, fd);
  }

  updateCustomer(customerId: string, customer: Customer, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in customer) {
      fd.append(key, customer[key]);
    }

    console.log('update Customer : ' + customerId + file.name);
    return this.webService.patch( `customers/${customerId}`, fd);
  }

  deleteCustomers(customerId: string) {
    return this.webService.delete(`customers/${customerId}`);
  }

  // barber
  getBarbers() {
    return this.webService.get(`barbers`);
  }

  getOneBarber(barberId: string) {
    return this.webService.get(`barbers/${barberId}`);
  }

  createBarber(barber: Barber, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in barber) {
      fd.append(key, barber[key]);
    }
    console.log('create Barber : ' + barber.firstname);
    return this.webService.post( `barbers`, fd);
  }

  updateBarber(barberId: string, barber: Barber, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in barber) {
      fd.append(key, barber[key]);
    }

    console.log('update Barber : ' + barberId + file.name);
    return this.webService.patch( `barbers/${barberId}`, fd);
  }

  deleteBarber(barberId: string) {
    return this.webService.delete(`barbers/${barberId}`);
  }

  // Distributor
  getDistributors() {
    return this.webService.get(`distributors`);
  }

  getOneDistributor(distributorId: string) {
    return this.webService.get(`distributors/${distributorId}`);
  }

  createDistributor(name: string) {
    return this.webService.post( `distributors`, { name });
  }

  deleteDistributors(distributorId: string) {
    return this.webService.delete(`distributors/${distributorId}`);
  }
}
