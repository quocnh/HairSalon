import 'package:flutter/material.dart';
import 'package:salonmobile/models/Service.dart';
import 'package:salonmobile/models/Location.dart';

class Salon {
  final String id;
  final String name;
  final String salonOwnerId;
  final List<String> barberId;
  final String phone;
  final String email;
  final Location location;

  final String info;
  final int priceFrom;
  final int priceTo;
  final int rate;
  final int numRate;
  final List<String> photos;
  final List<String> customerPhotos;
  final List<Service> services;

  Salon({
    @required this.id,
    @required this.name,
    @required this.salonOwnerId,
    this.barberId,
    @required this.phone,
    this.email,
    @required this.location,
    this.info,
    this.priceFrom = 0,
    this.priceTo = 0,
    this.rate = 0,
    this.numRate = 0,
    this.photos,
    this.customerPhotos,
    this.services,
  });
}
