import 'package:flutter/material.dart';
import 'package:salonmobile/components/product_card.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/screens/home/components/section_title.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/utils/size_config.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

// ignore: must_be_immutable
class SalonList extends StatelessWidget {
  SalonUtilsService sus = new SalonUtilsService();

  void getSalons() async {
    var salonLists = await this.sus.getAllSalons();
    print("Hellooooo");
    store.set('listSalons', salonLists);
    print(salonLists);
  }
  @override
  Widget build(BuildContext context) {
    getSalons();
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(title: "Salon", press: () {}),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ...List.generate(
                demoProducts.length,
                (index) {
                  if (demoProducts[index].isPopular)
                    return ProductCard(product: demoProducts[index]);

                  return SizedBox
                      .shrink(); // here by default width and height is 0
                },
              ),
              SizedBox(width: getProportionateScreenWidth(20)),
            ],
          ),
        )
      ],
    );
  }
}
