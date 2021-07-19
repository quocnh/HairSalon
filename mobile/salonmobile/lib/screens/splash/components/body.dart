import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/screens/splash/components/splash_content.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/app_localizations.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatefulWidget {
  double latitude;
  double longitude;
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  int currentPage = 0;
  var locationMessage = "";

  void getCurrentLocation() async{
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    var lastPosition = await Geolocator.getLastKnownPosition();
    print(lastPosition);
    setState(() {
      locationMessage = "${position.latitude}, ${position.longitude}";
      widget.latitude = position.latitude;
      widget.longitude = position.longitude;
      print("PHAN HUU TUNG");
      print("lat: ${position.latitude}, long: ${position.longitude}");
      print("${widget.latitude}, ${widget.longitude}");
    });
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getCurrentLocation();
  }
  List<Map<String, String>> splashData = [
    {"text": "pageview_1", "image": "assets/images/splash_1.png"},
    {"text": "pageview_2", "image": "assets/images/splash_2.png"},
    {"text": "pageview_3", "image": "assets/images/splash_3.png"},
  ];

  //TODO: call this function everytime load new screens
  SalonUtilsService sus = new SalonUtilsService();
  void getSalons() async {
    var salonLists = await this.sus.getAllSalons();
    print("Hello Splash");
    store.set('listSalons', salonLists);
  }

  @override
  Widget build(BuildContext context) {
    getSalons();
    return SafeArea(
      child: SizedBox(
        width: double.infinity,
        child: Column(
          children: <Widget>[
            Expanded(
              flex: 3,
              child: PageView.builder(
                onPageChanged: (value) {
                  setState(() {
                    currentPage = value;
                  });
                },
                itemCount: splashData.length,
                itemBuilder: (context, index) => SplashContent(
                  text: getText(context, index),
                  image: splashData[index]["image"],
                ),
              ),
            ),
            Expanded(
                flex: 2,
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: getProportionateScreenWidth(20)),
                  child: Column(
                    children: <Widget>[
                      Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(
                          splashData.length,
                          (index) => buildDot(index: index),
                        ),
                      ),
                      Spacer(
                        flex: 3,
                      ),
                      DefaultButton(
                        text:
                            AppLocalizations.of(context).translate('continue'),
                        press: () {
                          // Navigator.pushAndRemoveUntil(
                          //   context,
                          //   MaterialPageRoute(
                          //       builder: (context) => SignInScreen()),
                          //       (Route<dynamic> route) => false,
                          // );
                          Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                                builder: (context) => MenuPageBuilderScreen()),
                            (Route<dynamic> route) => false,
                          );
                          // Navigator.pushNamed(context, SignInScreen.routeName);
                        },
                      ),
                      Spacer(),
                    ],
                  ),
                ))
          ],
        ),
      ),
    );
  }

  AnimatedContainer buildDot({int index}) {
    return AnimatedContainer(
      duration: kAnimationDuration,
      margin: EdgeInsets.only(right: 5),
      height: 6,
      width: currentPage == index ? 20 : 6,
      decoration: BoxDecoration(
        color: currentPage == index ? kPrimaryColor : Color(0xFFD8D8D8),
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }

  getText(BuildContext context, int index) {
    switch (index) {
      case 0:
        return AppLocalizations.of(context)
            .translate(splashData[index]["text"]);
        break;
      case 1:
        return AppLocalizations.of(context)
            .translate(splashData[index]["text"]);
        break;
      case 2:
        return AppLocalizations.of(context)
            .translate(splashData[index]["text"]);
        break;
      default:
    }
  }
}
