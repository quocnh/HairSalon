import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:salonmobile/components/salons_card.dart';
import 'package:salonmobile/controllers/salon_controller.dart';
import 'package:salonmobile/screens/home/components/section_title.dart';
import 'package:salonmobile/screens/search_salons_of_city/search_salons_screen_of_city.dart';
import 'package:salonmobile/utils/size_config.dart';

// ignore: must_be_immutable
class SalonNearMe extends StatelessWidget {
  // declare controller
  final SalonController salonController = Get.find();

  @override
  Widget build(BuildContext context) {
    // var length = (listSalons.length > 5) ? 5: listSalons.length;
    return SizedBox(
      height: getProportionateScreenHeight(260),
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.symmetric(
                horizontal: getProportionateScreenWidth(20)),
            child: SectionTitle(title: "Salons Near Me", press: () {
              salonController.getCitySalon("Hồ Chí Minh");
              Get.to(SearchSalonsOfCityScreen());
            }),
          ),
          SizedBox(
            height: getProportionateScreenHeight(15),
          ),
             Expanded(child: Obx(() {
              if (salonController.isLoading.value)
                return Center(child: Center(child: CircularProgressIndicator()));
              else
                return (salonController.latitude.value == 0 &&
                    salonController.longitude.value == 0)
                    ? Padding(
                  padding: EdgeInsets.only(right: getProportionateScreenWidth(20)),
                      child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                      children: [
                        ...List.generate(
                          (salonController.salonList.length > 5)
                              ? 5
                              : salonController.salonList.length,
                              (index) {
                            return SalonsCard(
                                salons: salonController.salonList[index]);
                            // if (demoProducts[index].isPopular)
                            //   return ProductCard(product: demoProducts[index]);
                            // return SizedBox
                            //     .shrink(); // here by default width and height is 0
                          },
                        ),
                        SizedBox(width: getProportionateScreenWidth(20)),
                      ],
                  ),
                ),
                    )
                    : (salonController.salonFromLocationList.isEmpty)
                    ? Padding(
                  padding: EdgeInsets.only(right: getProportionateScreenWidth(20)),
                      child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                      children: [
                        ...List.generate(
                          (salonController.salonList.length > 5)
                              ? 5
                              : salonController.salonList.length,
                              (index) {
                            return SalonsCard(
                                salons: salonController.salonList[index]);
                            // if (demoProducts[index].isPopular)
                            //   return ProductCard(product: demoProducts[index]);
                            // return SizedBox
                            //     .shrink(); // here by default width and height is 0
                          },
                        ),
                        SizedBox(width: getProportionateScreenWidth(20)),
                      ],
                  ),
                ),
                    )
                    : Padding(
                  padding: EdgeInsets.only(right: getProportionateScreenWidth(20)),
                      child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                      children: [
                        ...List.generate(
                          (salonController.salonFromLocationList.length >
                              5)
                              ? 5
                              : salonController
                              .salonFromLocationList.length,
                              (index) {
                            return SalonsCard(
                                salons: salonController
                                    .salonFromLocationList[index]);
                            // if (demoProducts[index].isPopular)
                            //   return ProductCard(product: demoProducts[index]);
                            // return SizedBox
                            //     .shrink(); // here by default width and height is 0
                          },
                        ),
                        SizedBox(width: getProportionateScreenWidth(20)),
                      ],
                  ),
                ),
                    );
            })),

        ],
      ),
    );
  }
}