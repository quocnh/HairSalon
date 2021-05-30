import 'package:flutter/material.dart';

class Location {
  final String district;
  final String city;
  final String address;
  final String longitude;
  final String latitude;

  Location({
    @required this.district,
    @required this.city,
    @required this.address,
    @required this.longitude,
    @required this.latitude,
  });
}
