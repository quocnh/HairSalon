import 'package:flutter/widgets.dart';
import 'package:salonmobile/screens/complete_profile/complete_profile_screen.dart';
import 'package:salonmobile/screens/forgot_password/forgot_password_screen.dart';
import 'package:salonmobile/screens/otp/otp_screen.dart';
import 'package:salonmobile/screens/sign_in/sign_in_screen.dart';
import 'package:salonmobile/screens/sign_up/sign_up_screen.dart';
import 'package:salonmobile/screens/splash/splash_screen.dart';

// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  SplashScreen.routeName: (context) => SplashScreen(),
  SignInScreen.routeName: (context) => SignInScreen(),
  ForgotPasswordScreen.routeName: (context) => ForgotPasswordScreen(),
  SignUpScreen.routeName: (context) => SignUpScreen(),
  CompleteProfileScreen.routeName: (context) => CompleteProfileScreen(),
  OtpScreen.routeName: (context) => OtpScreen(),
};
