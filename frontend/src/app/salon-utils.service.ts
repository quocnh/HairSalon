import { Injectable } from '@angular/core';
import { WebService } from './web.service';
// import Customer from './module/customer';
import Salon from './module/salon';
import Barber from './module/barber';
import Service from './module/service';
import Booking from './module/booking';
import Product from './module/product';
import productOrder from './module/productOrder';
import SalonOwner from './module/salonOwner';
import Distributor from './module/distributor';
import Comment from './module/comment';
import User from './module/userAccount';
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

  deleteSalonOwnerFromUserId(userId: string) {
    return this.webService.delete(`salonOwners/userId/${userId}`);
  }

  updateSalonOwner(salonOwner: SalonOwner, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
      console.log('update salonOwners : ' + salonOwner._id + file.name);
    }

    // tslint:disable-next-line: forin
    for (key in salonOwner) {
      fd.append(key, salonOwner[key]);
    }
    // console.log('update salonOwners : ' + salonOwner._id);
    // console.log('update phone : ' + salonOwner.phone);
    return this.webService.patch( `salonOwners/${salonOwner._id}`, fd);
  }

  // get distributor name from Id
  getUserFromSalonOwnerId(ownerId: string) {
    return this.webService.get(`salonOwners/getUser/${ownerId}`);
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

  // get salonOwners Id from userId
  getSalonOwnerIdFromUserId(userId: string) {
    return this.webService.get(`salonOwners/userId/${userId}`);
  }

  // get salonOwners Id from city/district
  getSalonsFromCityDistrict(city: string, district:string) {
    return this.webService.get(`salons/city_district/${city}/${district}`);
  }

  getSalonsFromLocation(long: Number, lat:Number) {
    return this.webService.get(`salons/location/${long}/${lat}`);
  }


  getSalonsFromCity(city: string) {
    console.log('getSalonsFromCity ' + city);
    return this.webService.get(`salons/city/${city}`);
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
  updateSalon(salon: Salon, files: File[], deletedList:any[]) {
    let key;
    const salonId: String  = salon._id;
    const fd = new FormData();
    //avatar

    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        fd.append('newPhotos[]', files[i]);
        fd.append('index[]', i.toString());        
      }
    }

    for (let i = 0; i < deletedList.length; i++) {
      fd.append('deletedPhotoList[]', deletedList[i].toString());
    }

    // temp code
    salon.priceTo = 0;
    salon.priceFrom = 0;

    // tslint:disable-next-line: forin
    for (key in salon) {      
      if(key === 'photos') {
        for (let i = 0; i < salon.photos.length; i++) {
          fd.append('photos[]', salon.photos[i]);
        }        
      } else if (key === 'serviceType') {
        for (let i = 0; i < salon.serviceType.length; i++) {
          fd.append('serviceType[]', salon.serviceType[i]);
        }        
      } else {
        fd.append(key, salon[key]);
      }
    }
    

    return this.webService.patch( `salons/${salonId}`, fd);
  }

  updateSalonCustomerPhotos(salon: Salon, files: File[]) {
    let key;
    const salonId: String  = salon._id;
    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        fd.append('customerPhotos[]', files[i]);       
      }
    }

    // tslint:disable-next-line: forin
    for (key in salon) {      
      if (key !== 'photos') {
        fd.append(key, salon[key]);
      }
    }
    for (let i = 0; i < salon.photos.length; i++) {
      fd.append('photos[]', salon.photos[i]);
    }
    // for (let i = 0; i < salon.customerPhotos.length; i++) {
    //   fd.append('customerPhotos[]', salon.customerPhotos[i]);
    // }
    
    return this.webService.patch( `salons/${salonId}/addCustomerPhotos`, fd);
  }

  deleteCustomerPhotos(salonId: String, customerPhoto: string) {  
    console.log(customerPhoto);  
    const fd = new FormData();
    fd.append('customerPhoto', customerPhoto);
    console.log(fd);
    return this.webService.patch( `salons/${salonId}/deleteCustomerPhotos`, fd);
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
/*
  // Customer
  getCustomers() {
    return this.webService.get(`customers`);
  }

  getOneCustomer(customerId: string) {
    return this.webService.get(`customers/${customerId}`);
  }
  getOneCustomerFromUserId(userId: string) {
    return this.webService.get(`customers/userId/${userId}`);
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
*/
  // barber
  getBarbers() {
    return this.webService.get(`barbers`);
  }

  getBarbersFromSalonId(salonId: string) {
    return this.webService.get(`barbers/salonId/${salonId}`);
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

    console.log('update Barber : ' + barberId);
    return this.webService.patch( `barbers/${barberId}`, fd);
  }

  deleteBarber(barberId: string) {
    return this.webService.delete(`barbers/${barberId}`);
  }

  getBarberIdFromUserId(userId: string) {
    return this.webService.get(`barbers/userId/${userId}`);
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
  deleteDistributorsFromUserId(userId: string) {
    return this.webService.delete(`distributors/userId/${userId}`);
  }

  updateDistrbibutor(distributor: Distributor, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('avatar', file, file.name);
      console.log('update distributor : ' + distributor._id + file.name);
    }

    // tslint:disable-next-line: forin
    for (key in distributor) {
      fd.append(key, distributor[key]);
    }
    console.log('update distributor : ' + distributor._id);
    console.log('update phone : ' + distributor.phone);
    return this.webService.patch( `distributors/${distributor._id}`, fd);
  }

  // get distributor Id from userId
  getDistributorIdFromUserId(userId: string) {
    return this.webService.get(`distributors/userId/${userId}`);
  }

  // get distributor name from Id
  getUserFromDistributorId(distributorId: string) {
    return this.webService.get(`distributors/getUser/${distributorId}`);
  }

  // get Product list from distributor id
  getProductsFromDistributorId(distributorId:string) {    
    return this.webService.get(`products/distributor/${distributorId}`);
  }

  getProductsFromDistributorIdAndCategoty(distributorId:string, category:string) {
    return this.webService.get(`products/distributor-category/${distributorId}/${category}`);
  }

  // create products
  createProduct(product: Product, file: File) {
    const fd = new FormData();
    let key;
    if (file) {
      fd.append('newPhotos[]', file, file.name);
    }

    // tslint:disable-next-line: forin
    for (key in product) {
      fd.append(key, product[key]);
      console.log(key + ': ' + product[key]);
    }
    console.log('create Product : ' + product.name);
    return this.webService.post( `products`, fd);
  }

  // Update product
  updateProduct(product: Product, files: File[], deletedList: any[]) {
    const fd = new FormData();
    let key;

    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        fd.append('newPhotos[]', files[i]);
        fd.append('index[]', i.toString());
        console.log('update Product : ' + files[i].name);
      }
      fd.append('deletedPhotoList[]', deletedList[i].toString());
    }

    // tslint:disable-next-line: forin
    for (key in product) {
      if (key !== 'photos')
      {
        //console.log(key);
        fd.append(key, product[key]);
      }      
    }
    for (let i = 0; i < product.photos.length; i++) {
      fd.append('photos[]', product.photos[i]);
      console.log('photos '+ i +': ' + product.photos[i]);
    }

    return this.webService.patch( `products/${product._id}`, fd);
  }

  
  //Get one product 
  getOneProduct(productId: string) {
    //console.log('Get Product : ' + productId);
    return this.webService.get(`products/${productId}`);
  }
  // Delete one product
  deleteProduct(productId: string) {
    return this.webService.delete(`products/${productId}`);
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
  updateBooking(booking: Booking){
    let key;
    const fd = new FormData();

    // tslint:disable-next-line: forin
    for (key in booking) {
      fd.append(key, booking[key]);
      // console.log(key + ': ' + booking[key]);
    }
    
    //console.log('create Booking : ' + booking.bookingDate + ' salonId:' + booking._salonId);
    return this.webService.patch(`bookings`, fd);
  }

  deleteOneBooking(bookingId: string){
    return this.webService.delete(`bookings/${bookingId}`);
  }

  getBookingsFromSalonId(salonId: string) {
    return this.webService.get(`bookings/salon/${salonId}`);
  } 
  getOneBooking(bookingId: string) {
    return this.webService.get(`bookings/${bookingId}`);
  } 

  // User Register
  callRegisterAPI(user : User){
    
    const fd = new FormData();
    let key;

    // tslint:disable-next-line: forin
    for (key in user) {
      fd.append(key, user[key]);
      console.log(key + ": " + user[key]);
    }
    console.log(fd.get('email'));
    
    return this.webService.post(`api/users/register-customer`, fd);
  }

  getUser(userId : string) {
    // console.log(userId);
    return this.webService.get(`api/user/getUser/${userId}`);
  }

  deleteUser(userId : string) {
    // console.log(userId);
    return this.webService.delete(`api/user/deleteUser/${userId}`);
  }

  getAllUser() {
    // console.log(userId);
    return this.webService.get(`api/user/getAllUser`);
  }

  getAllCustomer() {
    // console.log(userId);
    return this.webService.get(`api/user/getAllCustomer`);
  }

  updateUserProfile(userId: string, user: User) {
    //console.log("Update User Profile ");
    //console.log(user);
    return this.webService.patch( `api/user/update/${userId}`, user);
  }

  // -- Product Order >>>>>  
  createNewProductOrder(pOrder: productOrder) {
    const fd = new FormData();
    let key;

    // tslint:disable-next-line: forin
    for (key in pOrder) {
      fd.append(key, pOrder[key]);
    }
    console.log('totalPrice : ' + pOrder.totalPrice);
    return this.webService.post( `productOrder`, fd);
  }
  getProductOrderFromDistributorId(distributorId:string) {
    return this.webService.get(`productOrder/distributor/${distributorId}`);
  }

  getProductOrderFromSalonOwnerId(salonOnwerId:string) {
    return this.webService.get(`productOrder/salonOwner/${salonOnwerId}`);
  }

  updateOrder(pOrder: productOrder) {
    const fd = new FormData();
    let key;

    // tslint:disable-next-line: forin
    for (key in pOrder) {
      fd.append(key, pOrder[key]);
    }
    return this.webService.patch(`productOrder/${pOrder._id}` ,fd);
  }
  // -- Product Order <<<<<

  // // -- Become Salon Owner >>>>>  
  //  createNewSalonOwner(becomeSalonOwnerObj: becomeSalonOwner) {
  //   const fd = new FormData();
  //   let key;

  //   for (key in becomeSalonOwnerObj) {
  //     fd.append(key, becomeSalonOwnerObj[key]);
  //   }
  //   // console.log('totalPrice : ' + becomeSalonOwnerObj.totalPrice);
  //   return this.webService.post( `productOrder`, fd);
  // }

  // Comment 
  addNewComment(newComment:Comment) {
    const fd = new FormData();
    fd.append('salonId', newComment.salon._id);
    fd.append('userId', newComment.user._id);
    fd.append('content', newComment.content);
    fd.append('rating', newComment.rating.toString());

    return this.webService.post( `comments`, fd);
  }

  getComments(salonId: string) {
    return this.webService.get(`comments/salon/${salonId}`);
  }

  verifyAccount(username: string, encryptedData: string) {
    return this.webService.get(`email/verification/${username}/${encryptedData}`);
  }

}
