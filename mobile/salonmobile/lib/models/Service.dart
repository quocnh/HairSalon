import 'package:flutter/material.dart';

class Service {
  final String name;
  final String price;
  final String discount;
  final String event;
  final String time;
  final String image;

  Service(
      {@required this.name,
      @required this.price,
      this.discount = "",
      this.event = "",
      this.time = "",
      this.image = ""});

  factory Service.fromJson(Map<String, dynamic> json) {
    // int tmr = 0, discount = 0;
    // double price = 0;
    // if (json['time'] != null)
    //   tmr = int.parse(json['time']);
    // if (json['discount'] != null)
    //   discount = int.parse(json['discount']);
    // if (json['price'] != null)
    //   price = double.parse(json['price']);

    return Service(
        name: json['name'],
        price: json['price'],
        discount: json['discount'],
        event: json['event'],
        time: json['time'],
        image: json['image']);
  }
}
