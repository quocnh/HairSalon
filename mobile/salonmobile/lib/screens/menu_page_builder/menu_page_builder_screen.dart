import 'package:flutter/material.dart';
import 'package:salonmobile/screens/home/home_screen.dart';
import 'package:salonmobile/screens/profile/account_info/AccountInformationScreen.dart';
import 'package:salonmobile/screens/profile/profile_screen.dart';
import 'package:salonmobile/screens/search_salons/search_salons_screen.dart';

class MenuPageBuilderScreen extends StatefulWidget {
  static String routeName = "/menu_screen";
  @override
  _MenuPageBuilderScreenState createState() => _MenuPageBuilderScreenState();
}

class _MenuPageBuilderScreenState extends State<MenuPageBuilderScreen> {
  PageController _pageController = PageController();
  List<Widget> _screens = [
    HomeScreen(),
    SearchSalonsScreen(),
    AccountInformationScreen(),
    ProfileScreen(),
  ];
  int _selectedIndex = 0;

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
                icon: Icon(
                  Icons.home,
                  color: _selectedIndex == 0 ? Colors.blue : Colors.grey,
                ),
                title: Text(
                  "Home",
                  style: TextStyle(
                      color: _selectedIndex == 0 ? Colors.blue : Colors.grey),
                )),
            BottomNavigationBarItem(
                icon: Icon(
                  Icons.search_sharp,
                  color: _selectedIndex == 1 ? Colors.blue : Colors.grey,
                ),
                title: Text(
                  "Search",
                  style: TextStyle(
                      color: _selectedIndex == 1 ? Colors.blue : Colors.grey),
                )),
            BottomNavigationBarItem(
                icon: Icon(
                  Icons.history,
                  color: _selectedIndex == 2 ? Colors.blue : Colors.grey,
                ),
                title: Text("History",
                    style: TextStyle(
                        color:
                            _selectedIndex == 2 ? Colors.blue : Colors.grey))),
            BottomNavigationBarItem(
                icon: Icon(
                  Icons.person,
                  color: _selectedIndex == 3 ? Colors.blue : Colors.grey,
                ),
                title: Text("Profile",
                    style: TextStyle(
                        color:
                            _selectedIndex == 3 ? Colors.blue : Colors.grey))),
          ],
        ));
  }

  void _onPageChanged(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _onItemTapped(int selectedIndex) {
    // print(selectedIndex);
    _pageController.jumpToPage(selectedIndex);
  }
}
