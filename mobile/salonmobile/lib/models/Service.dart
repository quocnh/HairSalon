import 'package:flutter/material.dart';

class Service {
  final String name;
  final double price;
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
    int tmr = 0, discount = 0;
    double price = 0;
    if (json['time'] != null)
      tmr = int.parse(json['time']);
    if (json['discount'] != null)
      discount = int.parse(json['discount']);
    if (json['price'] != null)
      price = double.parse(json['price']);

    return Service(
        name: json['name'],
        price: price,
        discount: discount,
        event: json['event'],
        time: tmr,
        image: json['image']);
  }
}
