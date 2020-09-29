import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Customer from './module/customer';
import Salon from './module/salon';
import Barber from './module/barber';
import { Service } from './module/salon';

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

  createSalons(salon: Salon, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('photo', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in salon) {
      fd.append(key, salon[key]);
    }
    console.log('create Salon : ' + salon.name);
    return this.webService.post( `salons`, fd);
  }

  deleteSalons(salonId: string) {
    return this.webService.delete(`salons/${salonId}`);
  }

  // -- update Salon
  updateSalon(salon: Salon, file: File) {
    const salonId: String  = salon._id;
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
      console.log('update Salon : ' + salonId + file.name);
    }
    console.log('update service : ' + salon.services[0].name + ' ' + salon.services[0].price);
    // tslint:disable-next-line: forin
    for (key in salon) {
      fd.append(key, salon[key]);
    }
    return this.webService.patch( `salons/${salonId}`, fd);
  }

  // -- add new service for Salon
  addSalonService(salonId: String, service: Service) {
    console.log('update service : ' + service.name + ' ' + service.price);
    return this.webService.patch( `salons/${salonId}/addService`, service);
  }

  delSalonService(salonId: String, service: Service) {
    console.log('delete service : ' + service.name + ' ' + service.price);
    return this.webService.patch( `salons/${salonId}/delService`, service);
  }

  updateSalonService(salonId: String, service: Service, index: Number) {
    console.log('update service at ' + index + ': ' + service.name + ' ' + service.price);
    return this.webService.patch( `salons/${salonId}/updateService/${index}`, service);
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
      console.log('update Customer : ' + customerId + file.name);
    }

    // tslint:disable-next-line: forin
    for (key in customer) {
      fd.append(key, customer[key]);
    }
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
