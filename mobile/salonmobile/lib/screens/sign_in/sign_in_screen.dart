import 'package:flutter/material.dart';
import 'package:salonmobile/screens/sign_in/components/body.dart';

class SignInScreen extends StatelessWidget {
  static String routeName = "/sign_in";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // title: Text(AppLocalizations.of(context).translate('sign_in')),
        centerTitle: true,
      ),
      body: Body(),
    );
  }
}
