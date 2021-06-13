import 'package:flutter/material.dart';
import 'package:salonmobile/components/salons_card.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/home/components/section_title.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';


// ignore: must_be_immutable
class SalonNearMe extends StatelessWidget {
  List<Salon> listSalons = store.get('listSalons');

  @override
  Widget build(BuildContext context) {
    // var length = (listSalons.length > 5) ? 5: listSalons.length;
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(title: "Salons Near Me", press: () {}),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        FutureBuilder<List<Salon>>(
          future: SalonUtilsService().getAllSalons(),
          builder: (context, snapshot){
            print('${snapshot.data} + PHT');
            print('Hello List Salons');
            if(snapshot.hasData){
              return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ...List.generate(
                (listSalons.length > 5) ? 5 : listSalons.length,
                (index) {
                   return SalonsCard(salons: listSalons[index]);
                  // if (demoProducts[index].isPopular)                 
                  //   return ProductCard(product: demoProducts[index]);                   
                  // return SizedBox
                  //     .shrink(); // here by default width and height is 0
                },

              ),
              SizedBox(width: getProportionateScreenWidth(20)),
            ],
          ),
        );
            }else if(snapshot.hasError){
              return Text('SERVER ERROR');
            }
            return Center(child: Center(child: CircularProgressIndicator()));
          })
      ],
    );
  }
}
