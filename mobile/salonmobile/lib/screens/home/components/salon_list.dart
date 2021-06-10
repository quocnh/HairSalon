import 'package:flutter/material.dart';
import 'package:salonmobile/components/product_card.dart';
import 'package:salonmobile/components/salons_card.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/home/components/section_title.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/utils/size_config.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

// ignore: must_be_immutable
class SalonList extends StatelessWidget {
  List<Salon> listSalons = store.get('listSalons');
  
  
  @override
  Widget build(BuildContext context) {
    // var length = (listSalons.length > 5) ? 5: listSalons.length;
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
                (listSalons.length > 5) ? 5 : listSalons.length,
                (index) {
                   return SalonCard(salons: listSalons[index]);
                  // if (demoProducts[index].isPopular)                 
                  //   return ProductCard(product: demoProducts[index]);                   
                  // return SizedBox
                  //     .shrink(); // here by default width and height is 0
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
