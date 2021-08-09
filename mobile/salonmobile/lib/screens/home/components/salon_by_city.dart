import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:salonmobile/controllers/salon_controller.dart';
import 'package:salonmobile/controllers/user_controller.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/screens/search_salons_of_city/search_salons_screen_of_city.dart';
import 'package:salonmobile/utils/size_config.dart';

import 'section_title.dart';

class SalonByCity extends StatelessWidget {
  final SalonController salonController = Get.find();
  final UserController userController = Get.find();
   SalonByCity({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(
            title: "Explore Salons",
            press: () {
              print(userController.user.value.id);
              salonController.getCitySalon("Hồ Chí Minh");
              Get.to(SearchSalonsOfCityScreen());
            },
          ),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        Padding(
          padding: EdgeInsets.only(right: getProportionateScreenWidth(20)),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                SalonByCityCard(
                  image: "assets/images/hcm2.jpg",
                  category: "Hồ Chí Minh",
                  numOfBrands: 18,
                  press: () {
                    print(demoProducts.length);
                    salonController.getCitySalon("Hồ Chí Minh");
                    Get.to(SearchSalonsOfCityScreen());
                    // Navigator.push(
                    //     context,
                    //     MaterialPageRoute(
                    //         builder: (context) => ListStoreScreen(
                    //             )));
                  },
                ),
                SalonByCityCard(
                  image: "assets/images/hanoi.jpg",
                  category: "Hà Nội",
                  numOfBrands: 24,
                  press: () {
                    print(demoProducts.length);
                    salonController.getCitySalon("Hà Nội");
                    Get.to(SearchSalonsOfCityScreen());
                  },
                ),
                SizedBox(width: getProportionateScreenWidth(20)),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class SalonByCityCard extends StatelessWidget {
  const SalonByCityCard({
    Key key,
    @required this.category,
    @required this.image,
    @required this.numOfBrands,
    @required this.press,
  }) : super(key: key);

  final String category, image;
  final int numOfBrands;
  final GestureTapCallback press;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
      child: GestureDetector(
        onTap: press,
        child: SizedBox(
          width: getProportionateScreenWidth(180),
          height: getProportionateScreenWidth(100),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(15),
            child: Stack(
              children: [
                Image.asset(
                  image,
                  width:getProportionateScreenWidth(180),
                  fit: BoxFit.fill,
                ),
                Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Color(0xFF343434).withOpacity(0.4),
                        Color(0xFF343434).withOpacity(0.15),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(15.0),
                    vertical: getProportionateScreenWidth(10),
                  ),
                  child: Text.rich(
                    TextSpan(
                      style: TextStyle(color: Colors.white),
                      children: [
                        TextSpan(
                          text: "$category\n",
                          style: TextStyle(
                            fontSize: getProportionateScreenWidth(18),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        TextSpan(text: "$numOfBrands cửa hàng")
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
