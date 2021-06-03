import 'package:flutter/material.dart';
import 'package:salonmobile/screens/list_store/components/body.dart';
import 'package:salonmobile/screens/list_store/components/list_test.dart';


class ListStoreScreen extends StatelessWidget {
  static String routeName = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Body(),
    );
  }
}
