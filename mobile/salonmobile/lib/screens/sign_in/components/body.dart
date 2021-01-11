import 'package:flutter/material.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Text(
            "Welcome Back",
            style: TextStyle(
              color: Colors.black,
              fontSize: getProportionateScreenWidth(28),
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
              "Đăng nhập với địa chỉ email và password \nhoặc sử dụng mạng xã hội")
        ],
      ),
    );
  }
}
