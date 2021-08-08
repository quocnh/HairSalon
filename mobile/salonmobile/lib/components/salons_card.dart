import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:get/get.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/controllers/salon_controller.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/detail_salon/DetailScreen.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class SalonsCard extends StatelessWidget {
  final SalonController salonController = Get.find();

  final Salon salons;

  SalonsCard({
    Key key,
    this.salons,
  }) : super(key: key);

  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        salonController.getIdSalon(salons.id);
        Get.to(KatokDetailScreen());
      },
      child: Container(
        width: getProportionateScreenWidth(200),
        child: Padding(
            padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
            child: Container(
              height: getProportionateScreenHeight(210),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                color: whiteColor,
                boxShadow: [
                  BoxShadow(
                      color: KatokGreyColor.withOpacity(0.6),
                      offset: Offset(0.0, 1.0),
                      blurRadius: 5.0)
                ],
              ),
              child:  Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: getProportionateScreenHeight(100),
                      child: ClipRRect(
                          borderRadius: BorderRadius.all(Radius.circular(10.0)),
                          child: CachedNetworkImage(
                            width: double.maxFinite,
                              cacheManager: cacheManager,
                              imageUrl: URL_IMAGE + salons.photos[0],
                              fit: BoxFit.fill,
                              placeholder: _loader,
                              errorWidget: _error)),
                    ),
                    SizedBox(height: getProportionateScreenHeight(10),),
                    Container(
                      margin: EdgeInsets.only(left: getProportionateScreenWidth(15)),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: getProportionateScreenWidth(150),
                            child: Text(
                              salons.name,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                  fontSize: getProportionateScreenWidth(16),
                                  color: KatokAppTextColorPrimary,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                          Row(
                            children: [
                              // Icon(Icons.location_on,
                              //     size: getProportionateScreenWidth(14),
                              //     color: KatokAppTextColorSecondary),
                              Container(
                                  width: getProportionateScreenWidth(150),
                                  child: Text(
                                    salons.address,
                                    style: TextStyle(
                                        fontSize:
                                        getProportionateScreenWidth(12),
                                        color: KatokGreyColor),
                                    overflow: TextOverflow.ellipsis,
                                    maxLines: 2,
                                  )),
                            ],
                          ),
                          Container(
                            width: getProportionateScreenWidth(160),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Text(
                                      "\$12.01",
                                      style: TextStyle(
                                          color: kPrimaryColor,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                                Row(
                                  children: [
                                    Text(salons.rating.toString()),
                                    Icon(Icons.star,color: Colors.yellow,)
                                    // Icon(
                                    //     icon: Icon(
                                    //       Icons.star,
                                    //       color: Colors.yellow,
                                    //     ))
                                  ],
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                    // Row(
                    //   crossAxisAlignment: CrossAxisAlignment.center,
                    //   children: [
                    //
                    //   ],
                    // ),

                  ],
                ),

            )),
      ),
    );
  }
}

Widget _loader(BuildContext context, String url) {
  return Center(child: CircularProgressIndicator());
}

Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}
