import 'dart:core';

import 'package:flutter/material.dart';
import 'package:salonmobile/models/KatokModel.dart';

import 'KatokConstants.dart';
import 'KatokImages.dart';


List<KatokBestSpecialModel> getSpecialList() {
  List<KatokBestSpecialModel> list = List<KatokBestSpecialModel>();
  list.add(KatokBestSpecialModel(title: 'Joseph Drake', subTitle: 'Makeup Artist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Hire Stylist', img: KatokDashedBoardImage1));
  list.add(KatokBestSpecialModel(title: 'willies carpen', subTitle: 'Barber', img: KatokDashedBoardImage6));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Makeup Artist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'Joseph Drake', subTitle: 'Makeup Artist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Hire Stylist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'willies carpen', subTitle: 'Barber', img: KatokDashedBoardImage1));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Makeup Artist', img: KatokDashedBoardImage6));

  return list;
}

List<KatokBestSpecialModel> getSpecialNewList() {
  List<KatokBestSpecialModel> list = List<KatokBestSpecialModel>();
  list.add(KatokBestSpecialModel(title: 'Joseph Drake', subTitle: 'Makeup Artist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Hire Stylist', img: KatokDashedBoardImage1));
  list.add(KatokBestSpecialModel(title: 'willies carpen', subTitle: 'Barber', img: KatokDashedBoardImage6));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Makeup Artist', img: KatokDashedBoardImage3));
  list.add(KatokBestSpecialModel(title: 'Dale Horward', subTitle: 'Hire Stylist', img: KatokDashedBoardImage2));
  list.add(KatokBestSpecialModel(title: 'willies carpen', subTitle: 'Barber', img: KatokDashedBoardImage6));
  return list;
}


List<KatokSpecialOfferModel> getSpecialOfferList() {
  List<KatokSpecialOfferModel> specialOfferList = List<KatokSpecialOfferModel>();
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Joseph Salon', subtitle: 'Cool Summer Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Sherman Hair ', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage6, title: 'Drake Hair Salon', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Barber Hair ', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage1, title: 'Joseph Drake', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage6, title: 'Joseph Hair ', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage6, title: 'Drake Hair ', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Joseph Hair', subtitle: 'Cool Summer Event'));
  return specialOfferList;
}

List<KatokSpecialOfferModel> getSpecialOfferNewList() {
  List<KatokSpecialOfferModel> specialOfferList = List<KatokSpecialOfferModel>();
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Joseph Drake Hair Salon', subtitle: 'Cool Summer Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Sherman Barber Hair Salon', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage6, title: 'Joseph Drake Hair Salon', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage3, title: 'Sherman Barber Hair Salon', subtitle: 'Cool Winter Event'));
  specialOfferList.add(KatokSpecialOfferModel(img: KatokDashedBoardImage1, title: 'Joseph Drake Hair Salon', subtitle: 'Cool Winter Event'));
  return specialOfferList;
}

List<MessageModel> getMessageList() {
  List<MessageModel> messageList = List<MessageModel>();
  messageList.add(MessageModel(img: KatokDashedBoardImage3, name: 'Sherman Barber Shop', message: 'Hi Jackson..', lastSeen: 'Now'));
  messageList.add(MessageModel(img: KatokDashedBoardImage2, name: 'Dale Horward', message: 'Thank you.', lastSeen: '8:30 AM'));
  messageList.add(MessageModel(img: KatokDashedBoardImage6, name: 'Norah Beauty Salon', message: 'Hello', lastSeen: 'Yesterday'));
  return messageList;
}

List<KatokCallModel> getCallList() {
  List<KatokCallModel> callList = List<KatokCallModel>();
  callList.add(
    KatokCallModel(
      img: KatokDashedBoardImage3,
      name: 'Sherman Barber Shop',
      callImg: Icons.call,
      callStatus: 'You call them',
      videoCallIcon: KatokVideoCallIcon,
      audioCallIcon: KatokCallIcon,
    ),
  );
  callList.add(
    KatokCallModel(
      img: KatokDashedBoardImage3,
      name: 'Dale Horward',
      callImg: Icons.call,
      callStatus: 'You miss call',
      videoCallIcon: KatokVideoCallIcon,
      audioCallIcon: KatokCallIcon,
    ),
  );
  callList.add(
    KatokCallModel(
      img: KatokDashedBoardImage1,
      name: 'Dale Horward',
      callImg: Icons.call,
      callStatus: 'You miss call',
      videoCallIcon: KatokVideoCallIcon,
      audioCallIcon: KatokCallIcon,
    ),
  );
  callList.add(
    KatokCallModel(
      img: KatokDashedBoardImage6,
      name: 'Dale Horward',
      callImg: Icons.call,
      callStatus: 'You miss call',
      videoCallIcon: KatokVideoCallIcon,
      audioCallIcon: KatokCallIcon,
    ),
  );
  return callList;
}

List<KatokGalleryModel> getGalleryList() {
  List<KatokGalleryModel> galleryList = <KatokGalleryModel>[];
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage1));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage2));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage3));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage6));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage2));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage6));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage2));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage3));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage6));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage1));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage3));
  galleryList.add(KatokGalleryModel(img: KatokDashedBoardImage1));
  return galleryList;
}

List<KatokCategoryModel> getCategory() {
  List<KatokCategoryModel> categoryList = <KatokCategoryModel>[];
  categoryList.add(KatokCategoryModel(img: KatokMakeUp, categoryName: 'All'));
  categoryList.add(KatokCategoryModel(img: KatokSkinCare, categoryName: 'Skin Care'));
  categoryList.add(KatokCategoryModel(img: KatokMakeUp, categoryName: 'Make Up'));
  categoryList.add(KatokCategoryModel(img: KatokHairColor, categoryName: 'Hair Color'));
  categoryList.add(KatokCategoryModel(img: KatokSkinCare, categoryName: 'Skin Care'));
  categoryList.add(KatokCategoryModel(img: KatokHairColor, categoryName: 'Hair Color'));

  return categoryList;
}

List<KatokOfferModel> getOfferList() {
  List<KatokOfferModel> offerList = List<KatokOfferModel>();
  offerList.add(
    KatokOfferModel(img: KatokDashedBoardImage1, offerName: 'Personality Girl Event', offerDate: 'June 10 - June 26', offerOldPrice: 100, offerNewPrice: 89),
  );
  offerList.add(
    KatokOfferModel(img: KatokDashedBoardImage2, offerName: 'Changer Hair Color', offerDate: 'May 10 - May 17', offerOldPrice: 80, offerNewPrice: 70),
  );
  offerList.add(
    KatokOfferModel(img: KatokDashedBoardImage3, offerName: 'Personality Girl Event', offerDate: 'Sep 12 - Sep 14', offerOldPrice: 120, offerNewPrice: 109),
  );
  offerList.add(
    KatokOfferModel(img: KatokDashedBoardImage3, offerName: 'Personality Girl Event', offerDate: 'Nov 05 - Nov 13', offerOldPrice: 150, offerNewPrice: 130),
  );
  return offerList;
}

List<KatokServicesModel> getDefaultServicesList() {
  List<KatokServicesModel> servicesList = List<KatokServicesModel>();
  servicesList.add(KatokServicesModel(img: KatokDashedBoardImage3, serviceName: 'hair Style', time: '45 Min', price: 50, radioVal: 1));
  servicesList.add(KatokServicesModel(img: KatokDashedBoardImage1, serviceName: 'Change Hair Color', time: '50 Min', price: 100, radioVal: 2));
  servicesList.add(KatokServicesModel(img: KatokDashedBoardImage3, serviceName: 'hair Cutting', time: '60 Min', price: 70, radioVal: 3));
  servicesList.add(KatokServicesModel(img: KatokDashedBoardImage3, serviceName: 'Skin Care', time: '30 Min', price: 150, radioVal: 4));
  return servicesList;
}

List<KatokIncludeServiceModel> getIncludeServicesList() {
  List<KatokIncludeServiceModel> servicesList = List<KatokIncludeServiceModel>();
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage3, serviceName: 'hair Cutting', time: '60 Min', price: 70));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage3, serviceName: 'Skin Care', time: '30 Min', price: 150));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage3, serviceName: 'hair Style', time: '45 Min', price: 50));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage1, serviceName: 'Change Hair Color', time: '50 Min', price: 100));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage3, serviceName: 'Change Hair Color', time: '50 Min', price: 100));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage1, serviceName: 'Change Hair Color', time: '50 Min', price: 100));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage6, serviceName: 'Change Hair Color', time: '50 Min', price: 100));
  servicesList.add(KatokIncludeServiceModel(serviceImg: KatokDashedBoardImage3, serviceName: 'Change Hair Color', time: '50 Min', price: 100));
  return servicesList;
}

List<KatokReviewModel> getDefaultReviewList() {
  List<KatokReviewModel> reviewList = List<KatokReviewModel>();
  reviewList.add(KatokReviewModel(img: KatokDashedBoardImage1, name: 'Carlos Day', rating: 4.5, day: '4 Day ago', review: KatokReview));
  reviewList.add(KatokReviewModel(img: KatokUserImg, name: 'Sherman', rating: 2.5, day: '10 Day ago', review: KatokReview));
  reviewList.add(KatokReviewModel(img: KatokUserImg, name: 'Dale Horward', rating: 4, day: '1 Day ago', review: KatokReview));
  reviewList.add(KatokReviewModel(img: KatokUserImg, name: 'Carlos Day', rating: 3.5, day: '3 Day ago', review: KatokReview));
  return reviewList;
}

List<KatokHairStyleModel> getDefaultHairStyleList() {
  List<KatokHairStyleModel> hairStyleList = List<KatokHairStyleModel>();
  hairStyleList.add(KatokHairStyleModel(img: KatokDashedBoardImage3, name: 'Carlos Day'));
  hairStyleList.add(KatokHairStyleModel(img: KatokDashedBoardImage2, name: 'Carlos Sherman'));
  hairStyleList.add(KatokHairStyleModel(img: KatokDashedBoardImage6, name: 'Dale Horward'));
  hairStyleList.add(KatokHairStyleModel(img: KatokDashedBoardImage1, name: 'Sherman'));
  return hairStyleList;
}

List<KatokMakeUpModel> getMakeupList() {
  List<KatokMakeUpModel> makeupList = List<KatokMakeUpModel>();
  makeupList.add(KatokMakeUpModel(img: KatokDashedBoardImage3, name: 'willies carpen'));
  makeupList.add(KatokMakeUpModel(img: KatokDashedBoardImage3, name: 'Carlos Day'));
  makeupList.add(KatokMakeUpModel(img: KatokDashedBoardImage3, name: 'Dale Horward'));
  makeupList.add(KatokMakeUpModel(img: KatokDashedBoardImage1, name: 'willies carpen'));
  return makeupList;
}

List<KatokNotificationModel> getNotificationList() {
  List<KatokNotificationModel> notificationList = List<KatokNotificationModel>();
  notificationList.add(KatokNotificationModel(img: KatokDashedBoardImage6, name: 'Sherman Shop', msg: 'Hi Jackson..', status: 'Just Now', callInfo: KatokCallIcon));
  notificationList.add(KatokNotificationModel(img: KatokDashedBoardImage2, name: 'Dale Horward', msg: 'Thank you.', status: '8:30 AM', callInfo: KatokMessage));
  notificationList.add(KatokNotificationModel(img: KatokDashedBoardImage3, name: 'Norah  Salon', msg: 'Hello', status: 'Yesterday', callInfo: KatokCallIcon));
  notificationList.add(KatokNotificationModel(img: KatokDashedBoardImage3, name: 'Norah Beauty', msg: 'Sent you a message', status: 'Tomorrow', callInfo: KatokMessage));
  return notificationList;
}

List<KatokNotifyModel> getNotifyList() {
  List<KatokNotifyModel> notifyList = List<KatokNotifyModel>();
  notifyList.add(
    KatokNotifyModel(img: KatokDashedBoardImage3, name: 'Norah Beauty Salon', address: '301 Dorthy walks,chicago,Us.', rating: 4.5, distance: 7.5),
  );
  notifyList.add(
    KatokNotifyModel(img: KatokDashedBoardImage1, name: 'Sherman Barber Shop', address: 'Dorthy walks,Us.', rating: 3.5, distance: 14.2),
  );
  notifyList.add(
    KatokNotifyModel(img: KatokDashedBoardImage3, name: 'willies carpen', address: '301 Dorthy walks,chicago,Us.', rating: 2.0, distance: 10.0),
  );
  notifyList.add(
    KatokNotifyModel(img: KatokDashedBoardImage3, name: 'Norah Beauty Salon', address: '301 Dorthy walks,chicago,Us.', rating: 5.0, distance: 17.5),
  );
  notifyList.add(
    KatokNotifyModel(img: KatokDashedBoardImage6, name: 'Dale Horward', address: '301 Dorthy walks,chicago,Us.', rating: 3.5, distance: 11.0),
  );
  return notifyList;
}

List<KatokMessageModel> getChatMsgData() {
  List<KatokMessageModel> list = List();

  KatokMessageModel c1 = KatokMessageModel();
  c1.senderId = KatokSender_id;
  c1.receiverId = KatokReceiver_id;
  c1.msg = 'Helloo';
  c1.time = '1:43 AM';
  list.add(c1);

  KatokMessageModel c2 = KatokMessageModel();
  c2.senderId = KatokSender_id;
  c2.receiverId = KatokReceiver_id;
  c2.msg = 'How are you? What are you doing?';
  c2.time = '1:45 AM';
  list.add(c2);

  KatokMessageModel c3 = KatokMessageModel();
  c3.senderId = KatokReceiver_id;
  c3.receiverId = KatokSender_id;
  c3.msg = 'Helloo...';
  c3.time = '1:45 AM';
  list.add(c3);

  KatokMessageModel c4 = KatokMessageModel();
  c4.senderId = KatokSender_id;
  c4.receiverId = KatokReceiver_id;
  c4.msg = 'I am good. Can you do something for me? I need your help.';
  c4.time = '1:45 AM';
  list.add(c4);

  KatokMessageModel c5 = KatokMessageModel();
  c5.senderId = KatokSender_id;
  c5.receiverId = KatokReceiver_id;
  c5.msg = 'I am good. Can you do something for me? I need your help.';
  c5.time = '1:45 AM';
  list.add(c5);

  KatokMessageModel c6 = KatokMessageModel();
  c6.senderId = KatokReceiver_id;
  c6.receiverId = KatokSender_id;
  c6.msg = 'I am good. Can you do something for me? I need your help.';
  c6.time = '1:45 AM';
  list.add(c6);

  KatokMessageModel c7 = KatokMessageModel();
  c7.senderId = KatokSender_id;
  c7.receiverId = KatokReceiver_id;
  c7.msg = 'I am good. Can you do something for me? I need your help.';
  c7.time = '1:45 AM';
  list.add(c7);

  KatokMessageModel c8 = KatokMessageModel();
  c8.senderId = KatokReceiver_id;
  c8.receiverId = KatokSender_id;
  c8.msg = 'I am good. Can you do something for me? I need your help.';
  c8.time = '1:45 AM';
  list.add(c8);

  KatokMessageModel c9 = KatokMessageModel();
  c9.senderId = KatokSender_id;
  c9.receiverId = KatokReceiver_id;
  c9.msg = 'I am good. Can you do something for me? I need your help.';
  c9.time = '1:45 AM';
  list.add(c9);

  KatokMessageModel c10 = KatokMessageModel();
  c10.senderId = KatokReceiver_id;
  c10.receiverId = KatokSender_id;
  c10.msg = 'I am good. Can you do something for me? I need your help.';
  c10.time = '1:45 AM';
  list.add(c10);

  KatokMessageModel c11 = KatokMessageModel();
  c11.senderId = KatokReceiver_id;
  c11.receiverId = KatokSender_id;
  c11.msg = 'I am good. Can you do something for me? I need your help.';
  c11.time = '1:45 AM';
  list.add(c11);

  KatokMessageModel c12 = KatokMessageModel();
  c12.senderId = KatokSender_id;
  c12.receiverId = KatokReceiver_id;
  c12.msg = 'I am good. Can you do something for me? I need your help.';
  c12.time = '1:45 AM';
  list.add(c12);

  KatokMessageModel c13 = KatokMessageModel();
  c13.senderId = KatokSender_id;
  c13.receiverId = KatokReceiver_id;
  c13.msg = 'I am good. Can you do something for me? I need your help.';
  c13.time = '1:45 AM';
  list.add(c13);

  KatokMessageModel c14 = KatokMessageModel();
  c14.senderId = KatokReceiver_id;
  c14.receiverId = KatokSender_id;
  c14.msg = 'I am good. Can you do something for me? I need your help.';
  c14.time = '1:45 AM';
  list.add(c14);

  KatokMessageModel c15 = KatokMessageModel();
  c15.senderId = KatokSender_id;
  c15.receiverId = KatokReceiver_id;
  c15.msg = 'I am good. Can you do something for me? I need your help.';
  c15.time = '1:45 AM';
  list.add(c15);

  KatokMessageModel c16 = KatokMessageModel();
  c16.senderId = KatokReceiver_id;
  c16.receiverId = KatokSender_id;
  c16.msg = 'I am good. Can you do something for me? I need your help.';
  c16.time = '1:45 AM';
  list.add(c16);

  KatokMessageModel c17 = KatokMessageModel();
  c17.senderId = KatokSender_id;
  c17.receiverId = KatokReceiver_id;
  c17.msg = 'I am good. Can you do something for me? I need your help.';
  c17.time = '1:45 AM';
  list.add(c17);

  KatokMessageModel c18 = KatokMessageModel();
  c18.senderId = KatokReceiver_id;
  c18.receiverId = KatokSender_id;
  c18.msg = 'I am good. Can you do something for me? I need your help.';
  c18.time = '1:45 AM';
  list.add(c18);

  return list;
}