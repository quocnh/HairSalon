import 'package:flutter/material.dart';

class Service {
  final String name;
  final int price;
  final int discount;
  final String event;
  final int time;
  final image;

  Service(
      {@required this.name,
      @required this.price,
      this.discount = 0,
      this.event = "",
      this.time = 0,
      this.image =""});

  factory Service.fromJson(Map<String, dynamic> json) {
    return Service(
        name: json['name'],
        price: json['price'],
        discount: json['discount'],
        event: json['event'],
        time: json['time'],
        image: json['image'].cast<String>());
  }
}
