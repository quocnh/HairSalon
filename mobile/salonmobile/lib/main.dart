import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:salonmobile/routes.dart';
import 'package:salonmobile/screens/splash/splash_screen.dart';
import 'package:salonmobile/utils/app_localizations.dart';
import 'package:salonmobile/utils/theme.dart';
void main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return RefreshConfiguration(
        headerBuilder: () => WaterDropHeader(),        // Configure the default header indicator. If you have the same header indicator for each page, you need to set this
        footerBuilder:  () => ClassicFooter(),        // Configure default bottom indicator
        headerTriggerDistance: 80.0,        // header trigger refresh trigger distance
        // springDescription:SpringDescription(stiffness: 170, damping: 16, mass: 1.9),         // custom spring back animate,the props meaning see the flutter api
        maxOverScrollExtent :100, //The maximum dragging range of the head. Set this property if a rush out of the view area occurs
        maxUnderScrollExtent:0, // Maximum dragging range at the bottom
        enableScrollWhenRefreshCompleted: true, //This property is incompatible with PageView and TabBarView. If you need TabBarView to slide left and right, you need to set it to true.
        enableLoadingWhenFailed : true, //In the case of load failure, users can still trigger more loads by gesture pull-up.
        hideFooterWhenNotFull: false, // Disable pull-up to load more functionality when Viewport is less than one screen
        enableBallisticLoad: true, // trigger load more by BallisticScrollActivity
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Katok',
          theme: theme(),
          // List all of the app's supported locales here
          supportedLocales: [
            Locale('vi', 'VN'),
            Locale('en', 'US'),
          ],
          // These delegates make sure that the localization data for the proper language is loaded
          localizationsDelegates: [
            // A class which loads the translations from JSON files
            AppLocalizations.delegate,
            // Built-in localization of basic text for Material widgets
            GlobalMaterialLocalizations.delegate,
            // Built-in localization for text direction LTR/RTL
            GlobalWidgetsLocalizations.delegate,
          ],
          // Returns a locale which will be used by the app
          localeResolutionCallback: (locale, supportedLocales) {
            // Check if the current device locale is supported
            for (var supportedLocale in supportedLocales) {
              if (supportedLocale.languageCode == locale.languageCode &&
                  supportedLocale.countryCode == locale.countryCode) {
                return supportedLocale;
              }
            }
            // If the locale of the device is not supported, use the first one
            // from the list (English, in this case).
            return supportedLocales.first;
          },
          // home: SplashScreen(),
          // use routeName so that we dont need to remember the name
          initialRoute: SplashScreen.routeName,
          // initialRoute: MenuPageBuilderScreen.routeName,
          routes: routes,
        )
    );
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Katok',
      theme: theme(),
      // List all of the app's supported locales here
      supportedLocales: [
        Locale('vi', 'VN'),
        Locale('en', 'US'),
      ],
      // These delegates make sure that the localization data for the proper language is loaded
      localizationsDelegates: [
        // A class which loads the translations from JSON files
        AppLocalizations.delegate,
        // Built-in localization of basic text for Material widgets
        GlobalMaterialLocalizations.delegate,
        // Built-in localization for text direction LTR/RTL
        GlobalWidgetsLocalizations.delegate,
      ],
      // Returns a locale which will be used by the app
      localeResolutionCallback: (locale, supportedLocales) {
        // Check if the current device locale is supported
        for (var supportedLocale in supportedLocales) {
          if (supportedLocale.languageCode == locale.languageCode &&
              supportedLocale.countryCode == locale.countryCode) {
            return supportedLocale;
          }
        }
        // If the locale of the device is not supported, use the first one
        // from the list (English, in this case).
        return supportedLocales.first;
      },
      // home: SplashScreen(),
      // use routeName so that we dont need to remember the name
      initialRoute: SplashScreen.routeName,
      // initialRoute: MenuPageBuilderScreen.routeName,
      routes: routes,
    );
  }
}
