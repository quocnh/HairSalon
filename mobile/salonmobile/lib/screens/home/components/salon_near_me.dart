import 'package:flutter/material.dart';
import 'package:salonmobile/components/salons_card.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/home/components/section_title.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';

// ignore: must_be_immutable
class SalonNearMe extends StatelessWidget {
  double latitude;
  double longitude;

  SalonNearMe({this.latitude, this.longitude});

  @override
  Widget build(BuildContext context) {
    print("latlat: $latitude, longlong: $longitude");
    // var length = (listSalons.length > 5) ? 5: listSalons.length;
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(title: "Salons Near Me", press: () {}),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        (latitude != null && longitude != null) ? FutureBuilder<List<Salon>>(
            future: SalonUtilsService().getSalonsFromLocation(
                longitude.toString(), latitude.toString()),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                if (snapshot.data.isEmpty){
                  return Center(child: Center(child: Text("TRỐNG")));
                }else{
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        ...List.generate(
                          (snapshot.data.length > 5) ? 5 : snapshot.data.length,
                              (index) {
                            return SalonsCard(salons: snapshot.data[index]);
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
                }

              }
              else if (snapshot.hasError) {
                return Text('SERVER ERROR');
              }
              return Center(child: Center(child: CircularProgressIndicator()));
            }) : FutureBuilder<List<Salon>>(
            future: SalonUtilsService().getSalonsFromCity("Hồ Chí Minh"),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                if (snapshot.data.isEmpty){
                  return Center(child: Center(child: Text("TRỐNG")));
                }else{
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        ...List.generate(
                          (snapshot.data.length > 5) ? 5 : snapshot.data.length,
                              (index) {
                            return SalonsCard(salons: snapshot.data[index]);
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
                }

              }
              else if (snapshot.hasError) {
                return Text('SERVER ERROR');
              }
              return Center(child: Center(child: CircularProgressIndicator()));
            })
      ],
    );
  }
}
