import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/components/categories.dart';
import 'package:salonmobile/screens/home/components/discount_banner.dart';
import 'package:salonmobile/screens/home/components/salon_by_city.dart';
import 'package:salonmobile/screens/home/components/salon_near_me.dart';
import 'package:salonmobile/utils/size_config.dart';
class Body extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Body();
  }
}
class _Body extends State<Body> {
  var locationMessage = "";
  double latitude;
  double longitude;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
          child: Column(
            children: [
              // SizedBox(height: getProportionateScreenHeight(10)),
              // LogoHeader(),
              // SizedBox(height: getProportionateScreenHeight(10)),
              // HomeHeader(),
              SizedBox(height: getProportionateScreenWidth(10)),
              DiscountBanner(),
              Categories(),
              SizedBox(height: getProportionateScreenWidth(15)),
              SalonByCity(),
              SizedBox(height: getProportionateScreenWidth(30)),
              SalonNearMe(),
              SizedBox(height: getProportionateScreenWidth(30)),
            ],
          ),
        ),
    );
  }
}
