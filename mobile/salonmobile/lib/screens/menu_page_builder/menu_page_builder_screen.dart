import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/home_screen.dart';
import 'package:salonmobile/screens/otp/otp_screen.dart';
import 'package:salonmobile/screens/profile/profile_screen.dart';

class MenuPageBuilderScreen extends StatefulWidget {
  static String routeName = "/menu_screen";
  @override
  _MenuPageBuilderScreenState createState() => _MenuPageBuilderScreenState();
}

class _MenuPageBuilderScreenState extends State<MenuPageBuilderScreen> {
  PageController _pageController = PageController();
  List<Widget> _screens = [
    HomeScreen(),
    OtpScreen(),
    ProfileScreen(),
  ];
  void _onPageChanged(int index) {}
  void _onItemTapped(int selectedIndex) {
    print(selectedIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: PageView(
          controller: _pageController,
          children: _screens,
          onPageChanged: _onPageChanged,
          physics: NeverScrollableScrollPhysics(),
        ),
        bottomNavigationBar: BottomNavigationBar(
          onTap: _onItemTapped,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              title: Text("Home"),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.history),
              title: Text("History"),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              title: Text("Account"),
            ),
          ],
        ));
  }
}
