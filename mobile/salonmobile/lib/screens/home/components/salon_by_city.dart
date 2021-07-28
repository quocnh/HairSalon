import 'package:flutter/material.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/screens/search_salons_of_city/search_salons_screen_of_city.dart';
import 'package:salonmobile/utils/size_config.dart';

import 'section_title.dart';

class SalonByCity extends StatelessWidget {
  const SalonByCity({
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
            press: () {},
          ),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              SalonByCityCard(
                image: "assets/images/hcm2.jpg",
                category: "Hồ Chí Minh",
                numOfBrands: 18,
                press: () {
                  print(demoProducts.length);
                  Navigator.push(context, MaterialPageRoute(builder: (context) => SearchSalonsOfCityScreen(city: "Hồ Chí Minh")));
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
                  Navigator.push(context, MaterialPageRoute(builder: (context) => SearchSalonsOfCityScreen(city: "Hà Nội")));
                },
              ),
              SizedBox(width: getProportionateScreenWidth(20)),
            ],
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
          width: getProportionateScreenWidth(200),
          height: getProportionateScreenWidth(100),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(
              children: [
                Image.asset(
                  image,
                  width:250,
                  fit: BoxFit.cover,
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
