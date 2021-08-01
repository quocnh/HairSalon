import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Comment {
  final String salonId;
  final String userId;
  final String date;
  final String content;
  final String rating;
  final List<String> image;

  Comment(
      {
        @required this.salonId,
        @required this.userId,
        @required this.date,
        @required this.content,
        this.rating = "4.0",
        this.image});

  factory Comment.fromJson(Map<String, dynamic> json) {
    String rating = '4.0';
    //print(json);
    if(json['rating'] != null)
      rating = json['rating'].toString();

    return Comment(
        salonId: json['salonId'],
        userId: json['userId'],
        date: json['createdDate'],
        content: json['content'],
        rating: rating,
        image: json['image']);
  }
}
