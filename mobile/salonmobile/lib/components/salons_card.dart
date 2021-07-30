import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class SalonsCard extends StatelessWidget {
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
    return Padding(
      padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
      child: Container(
        width: getProportionateScreenWidth(210),
        child: GestureDetector(
          // onTap: () => Navigator.pushNamed(
          //   context,
          //   DetailProductScreen.routeName,
          //   arguments: ProductDetailsArguments(product: salons),
          // ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: getProportionateScreenWidth(200),
                height: getProportionateScreenHeight(120),
                child: ClipRRect(
                    borderRadius: BorderRadius.all(Radius.circular(20)),
                    child: CachedNetworkImage(
                        cacheManager: cacheManager,
                        imageUrl: URL_IMAGE + salons.photos[0],
                        fit: BoxFit.fill,
                        placeholder: _loader,
                        errorWidget: _error)
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: getProportionateScreenWidth(150),
                    child: Text(
                      salons.name,
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: getProportionateScreenWidth(16),
                        fontWeight: FontWeight.bold,
                      ),
                      overflow: TextOverflow.clip,

                    ),
                  ),
                  Row(
                    children: [
                      Text(salons.rating.toString()),
                      IconButton(onPressed: null, icon: Icon(Icons.star,color: Colors.yellow,))
                    ],
                  )
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: getProportionateScreenWidth(200),
                    child: Text(
                      salons.address,
                      style: TextStyle(
                        fontSize: getProportionateScreenWidth(13),
                        fontWeight: FontWeight.w600,
                        color: kPrimaryColor,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              )
            ],
          ),
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