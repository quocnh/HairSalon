import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:salonmobile/screens/search_salons/components/body.dart';


class SearchSalonsScreen extends StatelessWidget {
  static String routeName = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.dark,
        child: Body(),
      ),
    );
  }
}
