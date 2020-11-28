import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Customer from './module/customer';
import User from './module/user';
import Salon from './module/salon';
import Barber from './module/barber';
import Service from './module/service';
import Booking from './module/booking';
import { ProductOrdersListViewComponent } from './pages/product-orders-list-view/product-orders-list-view.component';
import Product from './module/product';

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
  updateSalon(salon: Salon, files: File[]) {
    let key;
    const salonId: String  = salon._id;
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        fd.append('newPhotos[]', files[i]);
        fd.append('index[]', i.toString());
        console.log('update Salon : ' + salonId + files[i].name);
      }
    }

    // temp code
    salon.priceTo = 0;
    salon.priceFrom = 0;

    // tslint:disable-next-line: forin
    for (key in salon) {
      fd.append(key, salon[key]);
    }
    for (let i = 0; i < salon.photos.length; i++) {
      fd.append('photos[]', salon.photos[i]);
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

  // get Product list from distributor id
  getProductsFromDistributorId(distributorId:string) {
    return this.webService.get(`products/${distributorId}`);
  }

  // create products
  createProduct(product: Product, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in product) {
      fd.append(key, product[key]);
    }
    console.log('create Product : ' + product.name);
    return this.webService.post( `products`, fd);
  }

  // get location
  getAddressfromHERE(address: string) {
    return this.webService.getAddress(address);
  }

  // Booking
  createBooking(booking: Booking){
    let key;
    const fd = new FormData();

    // tslint:disable-next-line: forin
    for (key in booking) {
      fd.append(key, booking[key]);
      //console.log('parameters : ' + booking[key]);
    }
    //console.log('create Booking : ' + booking.bookingDate + ' salonId:' + booking._salonId);
    return this.webService.post(`bookings`, fd);  
  }

  getBookingsFromSalonId(salonId: string) {
    return this.webService.get(`bookings/salon/${salonId}`);
  }  

  // User Register
  callRegisterAPI(user : User){
    
    const fd = new FormData();
    let key;

    // tslint:disable-next-line: forin
    for (key in user) {
      fd.append(key, user[key]);
      console.log('parameters : ' + user[key]);
    }
    console.log('create Customer : ' + user.username);
    
    return this.webService.post( `api/users/register-customer`, fd);
  }
}
