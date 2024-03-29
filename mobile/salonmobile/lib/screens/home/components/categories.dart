import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:salonmobile/utils/app_localizations.dart';
import 'package:salonmobile/utils/size_config.dart';

class Categories extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> categories = [
      {"icon": "assets/icons/bh_hairColor.svg", "text": AppLocalizations.of(context).translate('hair')},
      {"icon": "assets/icons/bh_makeUp.svg", "text": AppLocalizations.of(context).translate('make_up')},
      {"icon": "assets/icons/bh_skinCare.svg", "text": AppLocalizations.of(context).translate('skin')},
      {"icon": "assets/icons/bh_nail.svg", "text": AppLocalizations.of(context).translate('nail')},
      {"icon": "assets/icons/bh_tattoo.svg", "text": AppLocalizations.of(context).translate('tatoo')},
      {"icon": "assets/icons/bh_spa.svg", "text": AppLocalizations.of(context).translate('spa')},
    ];
    return Padding(
      padding: EdgeInsets.only(
          top: getProportionateScreenWidth(5),
          bottom: getProportionateScreenWidth(0),
          right: getProportionateScreenWidth(7.5),
          left: getProportionateScreenWidth(7.5)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: List.generate(
          categories.length,
          (index) => CategoryCard(
            icon: categories[index]["icon"],
            text: categories[index]["text"],
            press: () {},
          ),
        ),
      ),
    );
  }
}

class CategoryCard extends StatelessWidget {
  const CategoryCard({
    Key key,
    @required this.icon,
    @required this.text,
    @required this.press,
  }) : super(key: key);

  final String icon, text;
  final GestureTapCallback press;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: press,
      child: SizedBox(
        width: getProportionateScreenWidth(55),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(getProportionateScreenWidth(10)),
              height: getProportionateScreenWidth(55),
              width: getProportionateScreenWidth(55),
              decoration: BoxDecoration(
                color: Color(0xFFFFECDF),
                borderRadius: BorderRadius.circular(10),
              ),
              child: SvgPicture.asset(
                icon,
              ),
            ),
            SizedBox(height: 5),
            Text(text, textAlign: TextAlign.center)
          ],
        ),
      ),
    );
  }
}
