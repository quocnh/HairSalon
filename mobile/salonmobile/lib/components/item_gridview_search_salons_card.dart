import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class ItemGridViewSearchSalonsCard extends StatelessWidget{
  final String name;
  final String image;
  ItemGridViewSearchSalonsCard({
    this.name,
    this.image
});
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(
      padding: EdgeInsets.only(
          bottom: getProportionateScreenHeight(30)),
      color: Colors.white,
      child: Column(
        children: [
          Container(
            width: getProportionateScreenWidth(160),
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
            padding: EdgeInsets.only(left: getProportionateScreenWidth(15)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(name, style: TextStyle(color: Colors.black,fontSize: getProportionateScreenWidth(14))),
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
    );
  }
}
Widget _loader(BuildContext context, String url) {
  return Center(child: CircularProgressIndicator());
}
Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}