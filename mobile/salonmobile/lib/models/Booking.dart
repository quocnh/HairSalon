import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Booking {
  final String salonId;
  final String userId;
  final String barberId;
  final String createdDate;
  final String bookingDate;
  final String bookingTime;
  final String info;
  final String status;

  Booking(
      {
        @required this.salonId,
        @required this.userId,
        this.barberId,
        this.createdDate,
        this.bookingDate,
        this.bookingTime,
        this.info,
        this.status});

  factory Booking.fromJson(Map<String, dynamic> json) {

    return Booking(
        salonId: json['_salonId'],
        userId: json['_userId'],
        barberId: json['_barberId'],
        createdDate: json['createdDate'],
        bookingDate: json['bookingDate'],
        bookingTime: json['bookingTime'],
        info: json['info'],
        status: json['status']);
  }
}
