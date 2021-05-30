import 'package:flutter/cupertino.dart';
import 'package:salonmobile/utils/size_config.dart';

class Aa extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Aa();
  }
}
class _Aa extends State<Aa> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return SingleChildScrollView(
      child: Column(
        children: [
          Text('This is test font text first'),
          SizedBox(height: getProportionateScreenHeight(20)),
          Text('This is test font text second'),
          SizedBox(height: getProportionateScreenHeight(20)),
          Text('This is test font text aaaa'),
          SizedBox(height: getProportionateScreenHeight(20)),
          Text('This is test font text Phan Huu Tung'),
          SizedBox(height: getProportionateScreenHeight(20)),
          Text('This is test font text Son Hoa - Phu Yen'),
          SizedBox(height: getProportionateScreenHeight(20)),
        ],
      )
    );
  }
}