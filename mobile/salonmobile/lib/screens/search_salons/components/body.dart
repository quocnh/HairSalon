import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/screens/search_salons/components/item_list.dart';
import 'package:salonmobile/screens/search_salons/components/map.dart';


class Body extends StatefulWidget {
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
          Map(),
          // Positioned(
          //     left: 0,
          //     top: 0,
          //     right: 0,
          //     child: Padding(
          //         padding: EdgeInsets.symmetric(
          //             vertical: getProportionateScreenHeight(40),
          //             horizontal: getProportionateScreenWidth(40)),
          //         child: Search())),
          ItemList(),

        ],
      );
  }

  @override
  bool get wantKeepAlive => true;
}
