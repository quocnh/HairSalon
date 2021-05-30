import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/components/product_card.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/screens/list_store/components/list_store.dart';
import 'package:salonmobile/screens/list_store/components/list_test.dart';
import 'package:salonmobile/screens/list_store/components/map.dart';
import 'package:salonmobile/screens/list_store/components/search_map.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Body();
  }
}

class _Body extends State<Body> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return SafeArea(
      child: Stack(
        children: [
          Map(),
          Positioned(
              left: 0,
              top: 0,
              right: 0,
              child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: getProportionateScreenHeight(40),
                      horizontal: getProportionateScreenWidth(40)),
                  child: SearchMap())),
          DraggableScrollableSheet(
            builder: (context, scrollController) {
              return SingleChildScrollView(
                controller: scrollController,
                scrollDirection: Axis.vertical,
                child: ListStore(),
              );
            },
            initialChildSize: 0.55,
            minChildSize: 0.1,
            maxChildSize: 0.85,
          )
        ],
      ),
    );
  }
}
