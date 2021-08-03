import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/screens/search_salons_of_city/components/body.dart';

class SearchSalonsOfCityScreen extends StatefulWidget{

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _SearchSalonsOfCityScreen();
  }
}
class _SearchSalonsOfCityScreen extends State<SearchSalonsOfCityScreen> {
  int _selectedIndex = 4;
  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: SafeArea(
          child: Scaffold(
            body: Body(),
            bottomNavigationBar: BottomNavigationBar(
              onTap: _onItemTapped,
              showSelectedLabels: true,
              showUnselectedLabels: true,
              type: BottomNavigationBarType.fixed,
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
                    title: Text("Appointment",
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
            ),
          ),
        ));

  }


  void _onItemTapped(int selectedIndex) {
    // print(selectedIndex);
    Get.to(MenuPageBuilderScreen());
  }
}
