import 'package:flutter/material.dart';
import 'package:salonmobile/utils/app_localizations.dart';

import 'components/body.dart';

class CompleteProfileScreen extends StatelessWidget {
  static String routeName = "/complete_profile";
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
