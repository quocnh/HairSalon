import "package:flutter/material.dart";
import 'package:salonmobile/screens/home/components/body.dart';
import 'package:salonmobile/utils/size_config.dart';

class HomeScreen extends StatelessWidget {
  static String routeName = "/home";
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      body: Body(),
      // bottomNavigationBar: CustomBottomNavBar(selectedMenu: MenuState.home),
    );
  }
}
