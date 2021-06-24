import 'package:flutter/material.dart';

class KatokBestSpecialModel {
  String title;
  String subTitle;
  String img;

  KatokBestSpecialModel({this.title, this.subTitle, this.img});
}

class KatokCallModel {
  String img;
  String name;
  IconData callImg;
  String callStatus;
  String videoCallIcon;
  String audioCallIcon;

  KatokCallModel({this.img, this.name, this.callImg, this.callStatus, this.videoCallIcon, this.audioCallIcon});
}

class KatokCategoryModel {
  String img;
  String categoryName;

  KatokCategoryModel({this.img, this.categoryName});
}

class KatokGalleryModel {
  String img;

  KatokGalleryModel({this.img});
}

class KatokHairStyleModel {
  String img;
  String name;

  KatokHairStyleModel({this.img, this.name});
}

class KatokIncludeServiceModel {
  String serviceImg;
  String serviceName;
  String time;
  int price;

  KatokIncludeServiceModel({this.serviceImg, this.serviceName, this.time, this.price});
}

class KatokMakeUpModel {
  String img;
  String name;

  KatokMakeUpModel({this.img, this.name});
}

class MessageModel {
  String img;
  String name;
  String message;
  String lastSeen;

  MessageModel({this.img, this.name, this.message, this.lastSeen});
}

class KatokNotificationModel {
  String img;
  String name;
  String msg;
  String status;
  String callInfo;

  KatokNotificationModel({this.img, this.name, this.msg, this.status, this.callInfo});
}
class KatokNotifyModel {
  String img;
  String name;
  String address;
  double rating;
  double distance;

  KatokNotifyModel({this.img, this.name, this.address, this.rating, this.distance});
}

class KatokOfferModel{

  String img;
  String offerName;
  String offerDate;
  int offerOldPrice;
  int offerNewPrice;

  KatokOfferModel({this.img, this.offerName, this.offerDate, this.offerOldPrice,
    this.offerNewPrice});
}


class KatokReviewModel{

  String img;
  String name;
  double rating ;
  String day;
  String review;

  KatokReviewModel({this.img, this.name, this.rating, this.day, this.review});
}

class KatokServicesModel{

  String img;
  String serviceName;
  String time;
  int price;
  int radioVal;

  KatokServicesModel({this.img, this.serviceName, this.time, this.price,this.radioVal});
}

class KatokSpecialOfferModel{
  String img;
  String title;
  String subtitle;

  KatokSpecialOfferModel({this.img, this.title, this.subtitle});
}

class KatokMessageModel {
  int senderId;
  int receiverId;
  String msg;
  String time;

  KatokMessageModel({this.senderId, this.receiverId, this.msg, this.time});
}
