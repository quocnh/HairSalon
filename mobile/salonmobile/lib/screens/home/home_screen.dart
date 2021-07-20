import "package:flutter/material.dart";
import 'package:salonmobile/screens/home/components/body.dart';
import 'package:salonmobile/utils/size_config.dart';

class HomeScreen extends StatefulWidget {
  static String routeName = "/home";
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with AutomaticKeepAliveClientMixin {

  @override
  Widget build(BuildContext context) {
    super.build(context);
    SizeConfig().init(context);
    return Scaffold(
      body: Body(),
      // bottomNavigationBar: CustomBottomNavBar(selectedMenu: MenuState.home),
    );
  }

  @override
  bool get wantKeepAlive => true;
}
