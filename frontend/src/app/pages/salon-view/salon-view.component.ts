import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Salon from '../../module/salon';
import Barber from '../../module/barber';
import { SalonUtilsService } from '../../salon-utils.service';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Service from '../../module/service';
import { Lightbox } from 'ngx-lightbox';
import Booking from 'app/module/booking';
import { environment } from 'environments/environment';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { GlobalConstants } from 'app/module/global-constants';
import { ConfirmComponent } from 'app/popup/confirm/confirm.component';
import Comment from '../../module/comment';
import User from 'app/module/userAccount';
import { LoginComponent } from 'app/popup/login/login.component';
import { SelectBarberComponent } from 'app/popup/select-barber/select-barber.component';

@Component({
  selector: 'app-salon-view',
  moduleId: module.id,
  templateUrl: './salon-view.component.html',
})

export class SalonViewComponent implements OnInit {

  salonId: string;
  salon: Salon = new Salon();
  modelDob: NgbDateStruct;
  today = this.calendar.getToday();
  selectServices: Array<Service> = [];
  total: number;
  strPhotos: any = new Array(10);
  strCustomerPhotos: any = new Array();
  customerPhotoLength = 0;
  time = { hour: 13, minute: 30 };
  meridian = true;
  barbers: Array<Barber> = [];
  booking: Booking = new Booking();
  newComment: Comment = new Comment();
  comments: Comment[] = new Array();
  selectedBaber: Barber = new Barber;

  isLoggedIn = false;
  user: any;
  bookingTime = GlobalConstants.BookingTime;
  // imageObject = [{
  //   image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  //   thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  //   title: 'Hummingbirds are amazing creatures'
  // }];
  imageObject: any = new Array();
  // object = {
  //   image: '',
  //   thumbImage: '',
  //   title: '',
  // }

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private salonUtilService: SalonUtilsService,
    private _lightbox: Lightbox,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    for (var i = 0; i < this.strPhotos.length; i++) {
      if (i < 5) {
        this.strPhotos[i] = 'assets/img/no_image.jpg';
      } else {
        this.strPhotos[i] = 'null';
      }
    }


    this.total = 0;
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.salonId = params.salonId;
      if (this.salonId) {
        this.getSalonInfo(this.salonId);
        this.getAllComment(this.salonId);
      }
    });
    this.modelDob = {
      year: this.today.year,
      month: this.today.month,
      day: this.today.day
    }
    this.booking.bookingTime = this.bookingTime[0];
  }
  getSalonInfo(salonId) {
    this.salonUtilService.getOneSalon(salonId).subscribe(
      (salons: Salon) => {
        this.salon = Object.assign({}, salons[0]);
        for (let i = 0; i < this.salon.photos.length; i++) {
          if ((this.salon.photos[i] !== '') && (this.salon.photos[i] !== 'null')) {
            this.strPhotos[i] = environment.dbAddress + '/' + this.salon.photos[i];
          }
        }
        this.getCustomerPhotos();
        // console.log(this.salon._barberId);
        for (let i = 0; i < this.salon._barberId.length; i++) {
          this.salonUtilService.getOneBarber(this.salon._barberId[i]).subscribe(
            (barber: Barber) => {
              this.barbers[i] = barber[0];
              // console.log(this.barbers);
            });
        }
        // console.log(this.salon);
      });
  }

  getAllComment(salonId) {
    this.comments = [];
    this.salonUtilService.getComments(salonId).subscribe(
      (comments: any) => {
        for(var i = 0; i < comments.length; i++) {
          //console.log(comments[i].userId);
          this.createComment(comments[i].userId, comments[i]).then(data => {
            // console.log(idx + ':' + data);
            this.comments.push(data);
            
          });
        }
        // console.log(comments);
      });
  }

  async createComment(userId: string, comment:any): Promise<Comment> {
    let retUser = new User;
    await this.salonUtilService.getUser(userId)
    .toPromise()
    .then(
    (user: User[]) => {        
      if (user.length > 0) {
        return user[0];  
      }
      return new User;
    }).then(data => retUser = data);

    let tmpComment = new Comment();
    tmpComment.salon = new Salon();
    tmpComment.user = new User();
    tmpComment.user.username = retUser.username;
    tmpComment.salon._id = comment.salonId;
    tmpComment.user._id = comment.userId;
    tmpComment.content = comment.content;
    if ((retUser.avatar !== null) && (retUser.avatar !== undefined)) {
      tmpComment.avatar = environment.dbAddress + '/' + retUser.avatar;
    }
    else {
      tmpComment.avatar = '../../assets/img/default-avatar.png';
    }
    
    tmpComment.createdDate = comment.createdDate;

    // console.log(tmpComment);
    return tmpComment;
  }

  // call signin modal function
  login() {    
    const ref = this.modalService.open(LoginComponent);
    ref.result.then((result) => {
      window.location.reload();          
    },
      (cancel) => {
        console.log('Need to login');
      })

    
  }

  reserveService() {
    console.log('Reserve Service');

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.user);
    } else {
      this.login();
      return;
    }

    this.booking._salonId = this.salonId;
    this.booking._userId = this.user.id;
    this.booking.status = GlobalConstants.BookingStatus[0];
    
    // this.booking.bookingDate.setUTCDate(20);
    this.booking.bookingDate = new Date(this.modelDob.year, this.modelDob.month-1, this.modelDob.day, 0, 0, 0, 0);
    //console.log(this.booking.bookingDate);
    this.salonUtilService.createBooking(this.booking).subscribe(
      (booking: Booking) => {
        //console.log(booking);
        const ref = this.modalService.open(ConfirmComponent);
        ref.componentInstance.confirmInfo = 'Bạn đã thành công đặt lịch vào ngày ' + this.modelDob.day + ' tháng ' + this.modelDob.month + ' năm ' + this.modelDob.year;
        ref.result.then((yes) => {
          
        },
        (cancel) => {
          console.log('cancel click');
        })
      });
  }

  selectServiceOnChange(sIndex) {
    sIndex -= 1;
    if (sIndex >= 0) {
      this.selectServices.push(this.salon.services[sIndex]);
      console.log(this.salon.services[sIndex].name);
      console.log(this.salon.services[sIndex].discount);
      if (+this.salon.services[sIndex].discount > 0) {
        this.total += (+this.salon.services[sIndex].price)*(100 - +this.salon.services[sIndex].discount)/100;
      } else {
        this.total += +this.salon.services[sIndex].price;
      }      
    }
  }

  selectBarberOnChange(sIndex) {
    if (sIndex > 0) {
      console.log(this.barbers[sIndex - 1]);
      this.booking._barberId = this.barbers[sIndex - 1]._id;
    }

  }

  selectBookingTimeOnChange(sIndex) {
    if (sIndex > 0) {
      console.log(this.bookingTime[sIndex - 1]);
      this.booking.bookingTime = this.bookingTime[sIndex - 1];
    }
  }

  deleteSelectedService(sIndex) {
    console.log('Xoa ' + sIndex);
    console.log(this.selectServices[sIndex].name);
    if (+this.selectServices[sIndex].discount > 0) {
      this.total -= (+this.selectServices[sIndex].price)*(+this.selectServices[sIndex].discount)/100;
    } else {
      this.total -= +this.selectServices[sIndex].price;
    }

    this.selectServices.splice(sIndex, 1);
  }

  open(index: number): void {
    // open lightbox
    const albums = [];

    for (let i = 0; i < 5; i++) {
      const src = this.strPhotos[i];
      const caption = '';
      const thumb = this.strPhotos[i];

      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      albums.push(album);
    }

    this._lightbox.open(albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  getCustomerPhotos(){
    this.customerPhotoLength = this.salon.customerPhotos.length;
    for (let i = 0; i < this.salon.customerPhotos.length; i++) {
      if ((this.salon.customerPhotos[i] !== '') && (this.salon.customerPhotos[i] !== 'null')) {
        this.strCustomerPhotos[i] = environment.dbAddress + '/' + this.salon.customerPhotos[i];
        // console.log(this.object);
        
        this.imageObject.push({
          image: this.strCustomerPhotos[i],
          thumbImage: this.strCustomerPhotos[i],
          // title: i,
        });
        // console.log(this.imageObject);
      }
    }
    
  }

  addNewComment(){
    //console.log(this.newComment.content);

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.user);
    } else {
      const ref = this.modalService.open(LoginComponent);
      ref.result.then((result) => {
        window.location.reload();            
      },
        (cancel) => {
          console.log('cancel click');
        })
      return;
    }

    this.newComment.salon = new Salon();
    this.newComment.user = new User();
    this.newComment.salon._id = this.salonId;
    this.newComment.user._id = this.user.id;    
    this.salonUtilService.addNewComment(this.newComment).subscribe(
      (comemnt: Comment) => {
        console.log(comemnt);
        this.getAllComment(this.salonId);
        this.newComment.content = '';
      });
  }

  selectBarber(){
    const ref = this.modalService.open(SelectBarberComponent);
    ref.componentInstance.salonId = this.salonId;
    ref.result.then((result) => {
      if (result) {
        //console.log("Result from login modal: ", result);
        this.selectedBaber = result;
        this.booking._barberId = this.selectedBaber._id;
      }
      },
      (cancel) => {
        console.log('cancel click');
      })
  }


  
}
