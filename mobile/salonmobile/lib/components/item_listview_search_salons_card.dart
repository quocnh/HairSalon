import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:get/get.dart';
import 'package:salonmobile/controllers/salon_controller.dart';
import 'package:salonmobile/screens/detail_salon/DetailScreen.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class ItemListViewSearchSalonsCard extends StatelessWidget{
  final SalonController salonController = Get.find();
  final String id;
  final String name;
  final String image;
  final String address;
  ItemListViewSearchSalonsCard({
    this.id,
    this.name,
    this.image,
    this.address
  });
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return GestureDetector(
      onTap: (){
        salonController.getIdSalon(id);
        Get.to(KatokDetailScreen());
      },
      child: Container(
        padding: EdgeInsets.only(
            right: getProportionateScreenWidth(20),
            left: getProportionateScreenWidth(20),
            bottom: getProportionateScreenHeight(20)),
        color: Colors.white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: getProportionateScreenWidth(130),
              height: getProportionateScreenHeight(130),
              child: ClipRRect(
                  borderRadius: BorderRadius.all(
                      Radius.circular(20)),
                  child: CachedNetworkImage(
                      cacheManager: cacheManager,
                      imageUrl: URL_IMAGE + image,
                      fit: BoxFit.cover,
                      placeholder: _loader,
                      errorWidget: _error)
              ),
            ),
            Container(
              padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name,style: TextStyle(color: Colors.black),),
                  Container(width:getProportionateScreenWidth(180),child: Text(address,overflow: TextOverflow.clip,)),
                  Row(
                    children: [
                      for(var i=0; i<5; i++)
                        Icon(Icons.star, color: Colors.yellow)
                    ],
                  ),
                  Text(
                    "\$12.01",
                    style: TextStyle(
                      fontSize: getProportionateScreenWidth(16),
                      fontWeight: FontWeight.w600,
                      color: kPrimaryColor,
                    ),
                  ),
                ],
              ),
            )

          ],
        ),
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