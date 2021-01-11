import 'package:flutter/material.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/constants.dart';
import 'package:salonmobile/screens/sign_in/sign_in_screen.dart';
import 'package:salonmobile/screens/splash/components/splash_content.dart';
import 'package:salonmobile/size_config.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  int currentPage = 0;
  List<Map<String, String>> splashData = [
    {
      "text": "Chào bạn đến với Awinst, thiên đường làm đẹp!",
      "image": "assets/images/splash_1.png"
    },
    {
      "text":
          "Chúng tôi kết nối hàng ngàn cửa hàng salon \n trên khắp đất nước hình chữ S",
      "image": "assets/images/splash_2.png"
    },
    {
      "text":
          "Làm đẹp và trải nghiệm tại Awinst tiện lợi hơn bao giờ hết. \nBạn chỉ cần ở nhà và tận hưởng!",
      "image": "assets/images/splash_3.png"
    },
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
                  text: splashData[index]["text"],
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
                        text: "Tiếp tục",
                        press: () {
                          Navigator.pushNamed(context, SignInScreen.routeName);
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
}
