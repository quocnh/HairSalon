import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:salonmobile/screens/splash/components/body.dart';
import 'package:salonmobile/utils/size_config.dart';

class SplashScreen extends StatefulWidget{
  static String routeName = "/splash";
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _SplashScreen();
  }
}
class _SplashScreen extends State<SplashScreen> {

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.dark,
        child: Body(),
      ),
    );
  }
}
