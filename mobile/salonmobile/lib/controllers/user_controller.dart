import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

class UserController extends GetxController{
  var isLoading = true.obs;
  var isLoginLoading = false.obs;
  var user = Rx(User());


  void signIn(String email, String password) async {
    try {
      isLoading(true);
      var userDB = await SalonUtilsService().login(email, password);
      if (userDB != null) {
        user.value = userDB;
        print(userDB.toString());
        Get.off(MenuPageBuilderScreen());
      } else {
        // changeLoading(); // isLoginLoading = false
        isLoginLoading.value = false;
        Fluttertoast.showToast(
            msg: "Incorrect Username or Password",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            timeInSecForIosWeb: 2,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
        print("Wrong usernamer/password");
      }
    } finally {
      isLoading(false);
    }
  }

  void changeLoading(){
    isLoginLoading.value = true;
  }
}