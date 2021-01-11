import 'package:flutter/material.dart';
import 'package:salonmobile/routes.dart';
import 'package:salonmobile/screens/splash/splash_screen.dart';
import 'package:salonmobile/utils/theme.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Hair Salon',
      theme: theme(),
      // home: SplashScreen(),
      // use routeName so that we dont need to remember the name
      initialRoute: SplashScreen.routeName,
      routes: routes,
    );
  }
}
