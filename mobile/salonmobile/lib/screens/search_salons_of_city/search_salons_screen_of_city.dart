import 'package:flutter/material.dart';
import 'package:salonmobile/screens/search_salons_of_city/components/body.dart';


class SearchSalonsOfCityScreen extends StatelessWidget {
  String city;
  SearchSalonsOfCityScreen({this.city});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Body(city: city),
    );
  }
}
