
import 'package:flutter/material.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/global_state.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';

import 'salon_images.dart';
import 'top_rounded_container.dart';

GlobalState gSalon = GlobalState.instance;

class Body extends StatelessWidget {
  //final Product product;
  final Salon salon;

  //const Body({Key key, @required this.product}) : super(key: key);
  const Body({Key key, @required this.salon}) : super(key: key);


  void getSalonFromId(String salonId) async {
    SalonUtilsService sus = new SalonUtilsService();
    var strSalon = await sus.getSalonFromId(salonId);
    print(strSalon);

    //parse received string to Salon structure
    // List<dynamic> l_salon = jsonDecode(strSalon);
    // print("-----");
    // print(l_salon[0]['photos'][0]);
    //salon.photos = l_salon[0]['photos'];
  }

  @override
  Widget build(BuildContext context) {
    getSalonFromId('5ff94b0a4c5a255ddc3a9327');
    return ListView(
      children: [
        SalonImages(salon: salon),
        TopRoundedContainer(
          color: Colors.white,
          child: Column(
            children: [
              // ProductDescription(
              //   salon: salon,
              //   pressOnSeeMore: () {},
              // ),
              TopRoundedContainer(
                color: Color(0xFFF6F7F9),
                child: Column(
                  children: [
                    // ColorDots(salon: salon),
                    TopRoundedContainer(
                      color: Colors.white,
                      child: Padding(
                        padding: EdgeInsets.only(
                          left: SizeConfig.screenWidth * 0.15,
                          right: SizeConfig.screenWidth * 0.15,
                          bottom: getProportionateScreenWidth(40),
                          top: getProportionateScreenWidth(15),
                        ),
                        child: DefaultButton(
                          text: "Add To Cart",
                          press: () {},
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
