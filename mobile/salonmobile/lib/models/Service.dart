import 'package:flutter/material.dart';

class Service {
  final String name;
  final int price;
  final int discount;
  final String event;

  Service(
      {@required this.name,
      @required this.price,
      this.discount = 0,
      this.event = ""});
}
