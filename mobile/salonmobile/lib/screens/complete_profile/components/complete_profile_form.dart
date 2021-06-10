import 'dart:developer';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/components/custom_surfix_icon.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/components/form_error.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/screens/otp/otp_screen.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class CompleteProfileForm extends StatefulWidget {
  User user;
  CompleteProfileForm(this.user);
  @override
  _CompleteProfileFormState createState() => _CompleteProfileFormState(user);
}

class _CompleteProfileFormState extends State<CompleteProfileForm> {
  User user;
  _CompleteProfileFormState(this.user);
  final _formKey = GlobalKey<FormState>();
  final List<String> errors = [];

  String firstName;
  String lastName;
  String phoneNumber;
  String address;
  String _verificationCode;

  void addError({String error}) {
    if (!errors.contains(error))
      setState(() {
        errors.add(error);
      });
  }

  void removeError({String error}) {
    if (errors.contains(error))
      setState(() {
        errors.remove(error);
      });
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          buildFirstNameFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildLastNameFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildPhoneNumberFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildAddressFormField(),
          FormError(errors: errors),
          SizedBox(height: getProportionateScreenHeight(40)),
          DefaultButton(
            text: "continue",
            press: () {
              if (_formKey.currentState.validate()) {
                _formKey.currentState.save();
                var userObj = User(
                    email: user.email,
                    password: user.password,
                    firstname: firstName,
                    lastname: lastName,
                    phone: phoneNumber,
                    address: address);
                inspect(userObj);
                phoneVeryfication(userObj.phone, context);
                // send OTP
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OtpScreen(
                        user: userObj,
                      ),
                    ));
              }
            },
          ),
        ],
      ),
    );
  }

  Future<bool> phoneVeryfication(String phone, BuildContext context) async {
    FirebaseAuth _auth = FirebaseAuth.instance;
    _auth.verifyPhoneNumber(
        phoneNumber: phone,
        timeout: Duration(seconds: 60),
        verificationCompleted: (AuthCredential authCredential) {
          _auth.signInWithCredential(authCredential).then((AuthResult result) {
            print("GOOD to go");
          }).catchError((e) {
            return "error";
          });
        },
        verificationFailed: (AuthException exception) {
          print(exception.message);
        },
        codeSent: (String verificationId, [int forceResendingToken]) {
          setState(() {
            _verificationCode = verificationId;
            store.set("verificationCode", _verificationCode);
            print(_verificationCode);
          });
          // showDialog(
          //     context: context,
          //     barrierDismissible: false,
          //     builder: (context) {
          //       return AlertDialog(
          //         title: Text("Give the code?"),
          //         content: Column(
          //           mainAxisSize: MainAxisSize.min,
          //           children: <Widget>[
          //             TextField(
          //               controller: _codeController,
          //             ),
          //           ],
          //         ),
          //         actions: <Widget>[
          //           FlatButton(
          //             child: Text("Confirm"),
          //             textColor: Colors.white,
          //             color: Colors.blue,
          //             onPressed: () async {
          //               final code = _codeController.text.trim();
          //               AuthCredential credential =
          //                   PhoneAuthProvider.getCredential(
          //                       verificationId: verificationId, smsCode: code);

          //               AuthResult result =
          //                   await _auth.signInWithCredential(credential);

          //               FirebaseUser user = result.user;

          //               if (user != null) {
          //                 Navigator.push(
          //                     context,
          //                     MaterialPageRoute(
          //                         builder: (context) => HomeScreen(
          //                               user: user,
          //                             )));
          //               } else {
          //                 print("Error");
          //               }
          //             },
          //           )
          //         ],
          //       );
          //     });
        },
        codeAutoRetrievalTimeout: null);
  }
  // void checkPhoneNumber(String phone, BuildContext context) async {
  //   try {
  //     final auth = Provider.of(context).auth;
  //     auth.phoneVeryfication(phone, context);
  //   } catch (e) {}
  // }

  TextFormField buildAddressFormField() {
    return TextFormField(
      onSaved: (newValue) => address = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kAddressNullError);
        }
        return null;
      },
      validator: (value) {
        if (value.isEmpty) {
          addError(error: kAddressNullError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Address",
        hintText: "Enter your phone address",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon:
            CustomSurffixIcon(svgIcon: "assets/icons/Location point.svg"),
      ),
    );
  }

  TextFormField buildPhoneNumberFormField() {
    return TextFormField(
      keyboardType: TextInputType.phone,
      onSaved: (newValue) => phoneNumber = '+84$newValue',
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kPhoneNumberNullError);
        }
        return null;
      },
      validator: (value) {
        if (value.isEmpty) {
          addError(error: kPhoneNumberNullError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Phone Number",
        hintText: "Enter your phone number",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Phone.svg"),
      ),
    );
  }

  TextFormField buildLastNameFormField() {
    return TextFormField(
      onSaved: (newValue) => lastName = newValue,
      decoration: InputDecoration(
        labelText: "Last Name",
        hintText: "Enter your last name",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/User.svg"),
      ),
    );
  }

  TextFormField buildFirstNameFormField() {
    return TextFormField(
      onSaved: (newValue) => firstName = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kNamelNullError);
        }
        return null;
      },
      validator: (value) {
        if (value.isEmpty) {
          addError(error: kNamelNullError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "First Name",
        hintText: "Enter your first name",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/User.svg"),
      ),
    );
  }
}
