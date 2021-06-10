import 'package:flutter/material.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/detail_salon/components/body.dart';
import 'package:salonmobile/screens/detail_salon/components/custom_app_bar.dart';

class DetailSalonScreen extends StatelessWidget {
  static String routeName = "/detail_salon";
  @override
  Widget build(BuildContext context) {
    final SalonDetailsArguments agrs =
        ModalRoute.of(context).settings.arguments;
    return Scaffold(
      backgroundColor: Color(0xFFF5F6F9),
      appBar: CustomAppBar(rating: 3.2),
      body: Body(salon: agrs.salon),
    );
  }
}

class SalonDetailsArguments {
  final Salon salon;

  SalonDetailsArguments({@required this.salon});
}
