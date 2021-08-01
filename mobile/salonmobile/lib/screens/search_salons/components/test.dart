import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:salonmobile/controllers/salon_controller.dart';

class Test extends StatelessWidget{
  final SalonController salonController = Get.find();
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      body: Container(
        child: Center(
            child: Obx((){
              if (salonController.isLoading.value)
                return Center(child: Center(child: CircularProgressIndicator()));
              else
                return Text(salonController.salonInfo.value.name);
            }),
          
        ),
      ),
    );
  }
}