import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class Body extends StatelessWidget {
  User user;
  Body(this.user);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: SizeConfig.screenHeight * 0.05),
              Text(
                "OTP Verification",
                style: headingStyle,
              ),
              Text("We sent your code to " +
                  user.phone.substring(0, user.phone.length - 3) +
                  "***"),
              buildTimer(),
              OtpForm(),
              SizedBox(height: SizeConfig.screenHeight * 0.1),
              DefaultButton(
                text: "Continue",
                press: () async {
                  String pin = store.get("code1") +
                      store.get("code2") +
                      store.get("code3") +
                      store.get("code4") +
                      store.get("code5") +
                      store.get("code6");
                  // print(int.parse(pin));
                  try {
                    AuthCredential credential = PhoneAuthProvider.getCredential(
                        verificationId: store.get("verificationCode"),
                        smsCode: pin);

                    AuthResult result = await FirebaseAuth.instance
                        .signInWithCredential(credential);

                    FirebaseUser user = result.user;
                    print("user: " + user.uid);

                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(
                          builder: (context) => MenuPageBuilderScreen()),
                      (Route<dynamic> route) => false,
                    );
                  } catch (e) {
                    print(e);
                  }
                },
              ),
              SizedBox(height: SizeConfig.screenHeight * 0.1),
              GestureDetector(
                onTap: () {
                  // OTP code resend
                  // phoneVeryfication();
                },
                child: Text(
                  "Resend OTP Code",
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Row buildTimer() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text("This code will expired in "),
        TweenAnimationBuilder(
          tween: Tween(begin: 30.0, end: 0.0),
          duration: Duration(seconds: 30),
          builder: (_, value, child) => Text(
            "00:${value.toInt()}",
            style: TextStyle(color: kPrimaryColor),
          ),
        ),
      ],
    );
  }
}
