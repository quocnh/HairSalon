import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
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

  void getCurrentLocation() async{
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    var lastPosition = await Geolocator.getLastKnownPosition();
    print(lastPosition);
    setState(() {
      locationMessage = "${position.latitude}, ${position.longitude}";
      latitude = position.latitude;
      longitude = position.longitude;
    });
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getCurrentLocation();
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
              SalonNearMe(latitude: latitude, longitude: longitude),
              SizedBox(height: getProportionateScreenWidth(30)),
            ],
          ),
        ),
    );
  }
}
