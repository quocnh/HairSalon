import 'package:flutter/material.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/utils/size_config.dart';

import 'components/body.dart';

class OtpScreen extends StatelessWidget {
  static String routeName = "/otp";
  final User user;
  OtpScreen({Key key, @required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        title: Text("OTP Verification"),
      ),
      body: Body(user),
    );
  }
}
