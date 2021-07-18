import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/screens/search_salons_of_city/components/item_list.dart';
import 'package:salonmobile/screens/search_salons_of_city/components/map.dart';
import 'package:salonmobile/utils/size_config.dart';


class Body extends StatefulWidget {
  String city;
  Body({this.city});
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Body();
  }
}

class _Body extends State<Body> with AutomaticKeepAliveClientMixin{

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Stack(
        children: [
          Map(city: widget.city),
          /// back
          Positioned(
              left: -(getProportionateScreenWidth(330)),
              top: -(getProportionateScreenHeight(25)),
              right: 0,
              child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: getProportionateScreenHeight(40),
                      horizontal: getProportionateScreenWidth(40)),
                  child: IconButton(
                      icon: IconButton(
                          icon: Icon(Icons.arrow_back_rounded, color: Colors.black),
                          onPressed: () {
                            Navigator.pop(context);
                          })))),
          ItemList(city: widget.city),

        ],
      );
  }

  @override
  bool get wantKeepAlive => true;
}
