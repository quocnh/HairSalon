import 'package:flutter/material.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/screens/sign_in/sign_in_screen.dart';
import 'package:salonmobile/screens/splash/components/splash_content.dart';
import 'package:salonmobile/utils/app_localizations.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  int currentPage = 0;
  List<Map<String, String>> splashData = [
    {"text": "pageview_1", "image": "assets/images/splash_1.png"},
    {"text": "pageview_2", "image": "assets/images/splash_2.png"},
    {"text": "pageview_3", "image": "assets/images/splash_3.png"},
  ];

  @override
  Widget build(BuildContext context) {
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
                          Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                                builder: (context) => SignInScreen()),
                                (Route<dynamic> route) => false,
                          );
                          // Navigator.pushAndRemoveUntil(
                          //   context,
                          //   MaterialPageRoute(
                          //       builder: (context) => MenuPageBuilderScreen()),
                          //   (Route<dynamic> route) => false,
                          // );
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
