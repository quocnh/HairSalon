import 'package:flutter/material.dart';

class User {
  final String id;
  final String email, password;
  final String firstname, lastname;
  final String phone;
  final String address;
  // final String state, city, country;
  final String avatar;
  // final List<Color> colors;
  // final double rating, price;
  // final bool isFavourite, isPopular;

  User({
    @required this.id,
    this.email="",
    this.password="",
    this.firstname="",
    this.lastname="",
    this.phone = "",
    this.address="",
    this.avatar="asset/images/default-avatar.png",
    // this.city,
    // this.country
  });

  factory User.fromJson(Map<String, dynamic> json) {
    String firstname = "", lastname = "";
    String avatar="assets/images/logo.png";
    if (json['avatar'] != null)
      avatar = json['avatar'];
    if (json['firstname'] != null)
      firstname = json['firstname'];
    if (json['lastname'] != null)
      lastname = json['lastname'];

    return User(
        id: json['_id'],
        firstname: firstname,
        lastname: lastname,
        avatar: avatar);
  }
}

List<User> demoUsers = [
  User(
    // id: 1,
    email: "quoc.nguyen@ndsu.edu",
    password: "123123123",
    firstname: "Quoc",
    lastname: "Nguyen",
    phone: "7017295142",
    address: "1067 17th Ave N",
    // state: "North Dakota",
    // city: "Fargo",
    // country: "USA"
  ),
  User(
    // id: 2,
    email: "huuquoc09@gmail.com",
    password: "123123123",
    firstname: "Mark",
    lastname: "Nguyen",
    phone: "7017295143",
    address: "1067 17th Ave N",
    // state: "Yogin",
    // city: "Yongin",
    // country: "Korea"
  ),
];
