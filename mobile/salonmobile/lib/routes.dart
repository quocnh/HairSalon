import 'package:flutter/widgets.dart';
import 'package:salonmobile/screens/sign_in/sign_in_screen.dart';
import 'package:salonmobile/screens/splash/splash_screen.dart';

// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  SplashScreen.routeName: (context) => SplashScreen(),
  SignInScreen.routeName: (context) => SignInScreen(),
};
