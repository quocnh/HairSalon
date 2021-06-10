import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/components/categories.dart';
import 'package:salonmobile/screens/home/components/discount_banner.dart';
import 'package:salonmobile/screens/home/components/home_header.dart';
import 'package:salonmobile/screens/home/components/salon_list.dart';
import 'package:salonmobile/screens/home/components/special_offers.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
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
            SpecialOffers(),
            SizedBox(height: getProportionateScreenWidth(30)),
            SalonList(),
            SizedBox(height: getProportionateScreenWidth(30)),
          ],
        ),
      ),
    );
  }
}
