import 'package:flutter/material.dart';
import 'package:salonmobile/screens/list_store/components/body.dart';



class ListStoreScreen extends StatelessWidget {
  static String routeName = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Danh sách cửa hàng'),
        centerTitle: true,
      ),
      body: Body(),
    );
  }
}
