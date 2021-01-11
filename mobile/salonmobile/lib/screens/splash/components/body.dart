import 'package:flutter/material.dart';
import 'package:salonmobile/constants.dart';
import 'package:salonmobile/size_config.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
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
                itemCount: splashData.length,
                itemBuilder: (context, index) => SplashContent(
                  text: splashData[index]["text"],
                  image: splashData[index]["image"],
                ),
              ),
            ),
            Expanded(flex: 2, child: SizedBox())
          ],
        ),
      ),
    );
  }
}

class SplashContent extends StatelessWidget {
  const SplashContent({
    Key key,
    this.text,
    this.image,
  }) : super(key: key);
  final String text, image;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Spacer(),
        Text(
          "AWINST",
          style: TextStyle(
              fontSize: getProportionateScreenWidth(36),
              color: kPrimaryColor,
              fontWeight: FontWeight.bold),
        ),
        Text(
          text,
          textAlign: TextAlign.center,
        ),
        Spacer(
          flex: 2,
        ),
        Image.asset(
          image,
          height: getProportionateScreenHeight(265),
          width: getProportionateScreenWidth(235),
        )
      ],
    );
  }
}
