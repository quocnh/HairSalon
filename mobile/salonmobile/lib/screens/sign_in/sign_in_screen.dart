import 'package:flutter/material.dart';
import 'package:salonmobile/screens/sign_in/components/body.dart';
import 'package:salonmobile/utils/app_localizations.dart';

class SignInScreen extends StatelessWidget {
  static String routeName = "/sign_in";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context).translate('sign_in')),
      ),
      body: Body(),
    );
  }
}
