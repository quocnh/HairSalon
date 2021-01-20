import 'package:flutter/material.dart';
import 'package:salonmobile/screens/sign_up/components/body.dart';
import 'package:salonmobile/utils/app_localizations.dart';

class SignUpScreen extends StatelessWidget {
  static String routeName = "/sign_up";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context).translate('sign_up')),
      ),
      body: Body(),
    );
  }
}
