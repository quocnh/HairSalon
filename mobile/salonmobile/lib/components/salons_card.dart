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
        width: getProportionateScreenWidth(300),
        child: Padding(
            padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
            child: Container(
              height: getProportionateScreenHeight(165),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: whiteColor,
                boxShadow: [
                  BoxShadow(
                      color: KatokGreyColor.withOpacity(0.6),
                      offset: Offset(0.0, 1.0),
                      blurRadius: 2.0)
                ],
              ),
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          width: getProportionateScreenWidth(130),
                          height: getProportionateScreenHeight(100),
                          child: ClipRRect(
                              borderRadius: BorderRadius.all(Radius.circular(15)),
                              child: CachedNetworkImage(
                                  cacheManager: cacheManager,
                                  imageUrl: URL_IMAGE + salons.photos[0],
                                  fit: BoxFit.fill,
                                  placeholder: _loader,
                                  errorWidget: _error)),
                        ),
                        SizedBox(
                          width: getProportionateScreenWidth(10),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: getProportionateScreenWidth(100),
                              child: Text(
                                salons.name,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                    fontSize: getProportionateScreenWidth(14),
                                    color: KatokAppTextColorPrimary,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                            SizedBox(
                              height: getProportionateScreenHeight(10),
                            ),
                            Row(
                              children: [
                                Icon(Icons.location_on,
                                    size: getProportionateScreenWidth(14),
                                    color: KatokAppTextColorSecondary),
                                Container(
                                    width: getProportionateScreenWidth(100),
                                    child: Text(
                                      salons.address,
                                      style: TextStyle(
                                          fontSize:
                                              getProportionateScreenWidth(12),
                                          color: KatokGreyColor),
                                      overflow: TextOverflow.ellipsis,
                                    )),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Text(
                              "\$12.01",
                              style: TextStyle(
                                  color: kPrimaryColor,
                                  fontSize: getProportionateScreenWidth(14),
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text(salons.rating.toString()),
                            IconButton(
                                onPressed: null,
                                icon: Icon(
                                  Icons.star,
                                  color: Colors.yellow,
                                ))
                          ],
                        )
                      ],
                    )
                  ],
                ),
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
