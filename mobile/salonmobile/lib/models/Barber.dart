import 'package:flutter/material.dart';

class Barber {
  final String id;
  final String userId;
  final String salonId;
  final String salonName;
  final String userName;
  final String firstname, lastname;
  final String phone;
  final String email;
  final String dob;
  final String gender;
  final String profile;
  final String avatar;
  final String hometown;
  final String idcard;
  final double rating;

  Barber(
      {@required this.id,
      @required this.salonId,
        this.userId = "",
        this.salonName="",
        this.userName="",
        this.firstname="", this.lastname="",
        this.phone="",
        this.email="",
        this.dob="",
        this.gender="",
        this.profile="",
        this.avatar="",
        this.hometown="",
        this.idcard = "",
        this.rating = 0});

  factory Barber.fromJson(Map<String, dynamic> json) {
    double rating = 0;

    if (json['rating'] != null)
      rating = double.parse(json['rating']);

    return Barber(
        firstname: json['firstname'],
        lastname: json['lastname'],
        profile: json['profile'],
        rating: rating,
        avatar: json['avatar']);
  }
}
