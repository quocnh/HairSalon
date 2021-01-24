import "package:flutter/material.dart";
import 'package:salonmobile/components/coustom_bottom_nav_bar.dart';
import 'package:salonmobile/screens/home/components/body.dart';
import 'package:salonmobile/utils/enums.dart';

class HomeScreen extends StatelessWidget {
  static String routeName = "/home";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Body(),
      bottomNavigationBar: CustomBottomNavBar(selectedMenu: MenuState.home),
    );
  }
}
