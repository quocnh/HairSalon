import 'package:flutter/material.dart';

class User {
  final int id;
  final String email, password;
  final String firstname, lastname;
  final int phone;
  final String address, state, city, country;
  // final List<String> images;
  // final List<Color> colors;
  // final double rating, price;
  // final bool isFavourite, isPopular;

  User(
      {@required this.id,
      @required this.email,
      @required this.password,
      this.firstname,
      this.lastname,
      this.phone = 0,
      this.address,
      this.state,
      this.city,
      this.country});

  List<User> demoUsers = [
    User(
        id: 1,
        email: "quoc.nguyen@ndsu.edu",
        password: "123123123",
        firstname: "Quoc",
        lastname: "Nguyen",
        phone: 7017295142,
        address: "1067 17th Ave N",
        state: "North Dakota",
        city: "Fargo",
        country: "USA"),
    User(
        id: 2,
        email: "huuquoc09@gmail.com",
        password: "123123123",
        firstname: "Mark",
        lastname: "Nguyen",
        phone: 7017295143,
        address: "1067 17th Ave N",
        state: "Yogin",
        city: "Yongin",
        country: "Korea"),
  ];
}
