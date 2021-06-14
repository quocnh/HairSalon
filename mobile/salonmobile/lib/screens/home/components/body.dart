import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/components/categories.dart';
import 'package:salonmobile/screens/home/components/discount_banner.dart';
import 'package:salonmobile/screens/home/components/home_header.dart';
import 'package:salonmobile/screens/home/components/salon_near_me.dart';
import 'package:salonmobile/screens/home/components/salon_by_city.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: getProportionateScreenHeight(20)),
            HomeHeader(),
            SizedBox(height: getProportionateScreenWidth(10)),
            DiscountBanner(),
            Categories(),
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
