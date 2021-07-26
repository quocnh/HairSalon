import 'package:flutter/material.dart';

class Service {
  final String name;
  final int price;
  final int discount;
  final String event;
  final int time;
  final image;

  Service(
      {this.name,
      this.price,
      this.discount,
      this.event,
      this.time,
      this.image});

  factory Service.fromJson(dynamic json) {
    return Service(
        name: json['name'],
        price: json['price'],
        discount: json['discount'],
        event: json['event'],
        time: json['time'],
        image: json['image'].cast<String>());
  }
}
