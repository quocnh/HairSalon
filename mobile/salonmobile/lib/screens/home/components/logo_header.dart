import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/components/icon_btn_with_counter.dart';
import 'package:salonmobile/screens/home/components/search_field.dart';
import 'package:salonmobile/screens/otp/otp_screen.dart';
import 'package:salonmobile/utils/size_config.dart';

class LogoHeader extends StatelessWidget {
  const LogoHeader({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(10)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset("assets/images/paypal.png", height: 40, width: 140, fit: BoxFit.fill),
        ],
      ),
    );
  }
}
