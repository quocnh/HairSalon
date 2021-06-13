import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class SalonsCard extends StatelessWidget {
  SalonsCard({
    Key key,
    this.aspectRetio = 1.02,
    this.salons,
  }) : super(key: key);

  final double aspectRetio;
  final Salon salons;
  final URL_IMAGE = 'https://awinst.com:3000/app/';
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
                height: getProportionateScreenHeight(150),
                child: ClipRRect(
                    borderRadius: BorderRadius.all(Radius.circular(20)),
                    child: CachedNetworkImage(
                        cacheManager: cacheManager,
                        imageUrl: URL_IMAGE + salons.photos[0],
                        fit: BoxFit.fill,
                        placeholder: _loader,
                        errorWidget: _error)),
              ),
              const SizedBox(height: 10),
              Text(
                salons.name,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: getProportionateScreenWidth(16),
                  ),                
                maxLines: 1,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "\$12.01",
                    style: TextStyle(
                      fontSize: getProportionateScreenWidth(18),
                      fontWeight: FontWeight.w600,
                      color: kPrimaryColor,
                    ),
                  ),
                  InkWell(
                    borderRadius: BorderRadius.circular(50),
                    onTap: () {},
                    child: Container(
                      padding: EdgeInsets.all(getProportionateScreenWidth(8)),
                      height: getProportionateScreenWidth(28),
                      width: getProportionateScreenWidth(28),
                      decoration: BoxDecoration(
                        color: kPrimaryColor.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: SvgPicture.asset("assets/icons/Heart Icon_2.svg",
                          color: Color(0xFFFF4848)),
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