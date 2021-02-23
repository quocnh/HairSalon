import 'package:flutter/material.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/utils/app_localizations.dart';

import 'components/body.dart';

class CompleteProfileScreen extends StatelessWidget {
  static String routeName = "/complete_profile";
  final User user;

  CompleteProfileScreen({Key key, @required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context).translate('sign_up')),
        // title: Text(user.email),
      ),
      body: Body(user),
    );
  }
}
