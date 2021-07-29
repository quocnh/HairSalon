import 'package:flutter/material.dart';

class Comment {
  final String salonId;
  final String userId;
  final String date;
  final String content;
  final List<String> image;

  Comment(
      {
        @required this.salonId,
        @required this.userId,
        @required this.date,
        @required this.content,
        this.image});

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
        salonId: json['salonId'],
        userId: json['userId'],
        date: json['date'],
        content: json['content'],
        image: json['image']);
  }
}
