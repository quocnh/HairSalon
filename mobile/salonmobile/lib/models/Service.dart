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
    String tmr = "", discount = "";
    String price = "", name="", event="", image="assets/images/logo.png";
    if (json['time'] != null)
      tmr = json['time'];
    if (json['discount'] != null)
      discount = json['discount'];
    if (json['price'] != null)
      price = json['price'];
    if (json['event'] != null)
      event = json['event'];
    if (json['name'] != null)
      name = json['name'];
    if (json['image'] != null)
      image = json['image'];

    return Service(
        name: name,
        price: price,
        discount: discount,
        event: event,
        time: tmr,
        image: image);
  }
}
