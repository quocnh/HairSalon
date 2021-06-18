import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/KatokConstants.dart';
import 'package:salonmobile/utils/KatokImages.dart';

class AccountInformationScreen extends StatefulWidget {
  static String tag = '/AccountInformationScreen';

  @override
  AccountInformationScreenState createState() =>
      AccountInformationScreenState();
}

class AccountInformationScreenState
    extends State<AccountInformationScreen> {
  bool _showPassword = true;
  TextEditingController fullNameCont = TextEditingController(text: "QUOC");
  TextEditingController dOBCont = TextEditingController(text: "20/08/1992");
  TextEditingController emailCont = TextEditingController();
  TextEditingController phoneNumCont = TextEditingController();
  TextEditingController passwordCont = TextEditingController();

  FocusNode fullNameFocusNode = FocusNode();
  FocusNode dOBFocusNode = FocusNode();
  FocusNode emailFocusNode = FocusNode();
  FocusNode phoneNumFocusNode = FocusNode();
  FocusNode passWordFocusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: whiteColor,
          centerTitle: true,
          leading: GestureDetector(
            onTap: () {
              finish(context);
            },
            child: Icon(Icons.arrow_back, color: blackColor),
          ),
          title: Text(KatokTxtAccountInformation,
              style: TextStyle(
                  color: KatokAppTextColorPrimary,
                  fontWeight: FontWeight.bold,
                  fontSize: 16)),
          // actions: [
          //   Padding(
          //     padding: EdgeInsets.only(right: 10),
          //     child: Align(
          //       alignment: Alignment.center,
          //       child: Text(KatokTxtEdit,
          //           style: TextStyle(
          //               color: KatokColorPrimary,
          //               fontSize: 14,
          //               fontWeight: FontWeight.bold)),
          //     ),
          //   )
          // ]
      ),
      body: Container(
        color: KatokGreyColor.withOpacity(0.1),
        height: MediaQuery.of(context).size.height,
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 115,
                width: 115,
                child: Stack(
                  fit: StackFit.expand,
                  overflow: Overflow.visible,
                  children: [
                    CircleAvatar(
                      backgroundImage:
                          AssetImage("assets/images/Profile Image.jpg"),
                    ),
                    Positioned(
                      right: -16,
                      bottom: 0,
                      child: SizedBox(
                        height: 46,
                        width: 46,
                        child: FlatButton(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50),
                            side: BorderSide(color: Colors.white),
                          ),
                          color: Color(0xFFF5F6F9),
                          onPressed: () {},
                          child:
                              SvgPicture.asset("assets/icons/Camera Icon.svg"),
                        ),
                      ),
                    )
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.all(16),
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [
                    BoxShadow(
                        offset: Offset(0.0, 1.0),
                        color: KatokGreyColor.withOpacity(0.3),
                        blurRadius: 2.0),
                  ],
                ),
                child: Column(
                  children: [
                    TextFormField(
                      controller: fullNameCont,
                      focusNode: fullNameFocusNode,
                      keyboardType: TextInputType.text,
                      textInputAction: TextInputAction.next,
                      onFieldSubmitted: (value) {
                        FocusScope.of(context).requestFocus(dOBFocusNode);
                      },
                      decoration: InputDecoration(
                        labelText: "Full Name",
                        labelStyle: TextStyle(color: KatokGreyColor, fontSize: 14),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                      ),
                    ),
                    TextFormField(
                      controller: dOBCont,
                      focusNode: dOBFocusNode,
                      keyboardType: TextInputType.datetime,
                      textInputAction: TextInputAction.next,
                      onFieldSubmitted: (value) {
                        FocusScope.of(context).requestFocus(emailFocusNode);
                      },
                      style: TextStyle(color: blackColor),
                      decoration: InputDecoration(
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        labelText: "Date of Birth",
                        suffixIcon: GestureDetector(
                          onTap: () {
                            showDatePicker(
                              context: context,
                              initialDate: DateTime.now(),
                              firstDate: DateTime(2014, 8),
                              lastDate: DateTime(2101),
                            );
                          },
                          child: Icon(Icons.calendar_today,
                              color: KatokColorPrimary, size: 16),
                        ),
                        labelStyle: TextStyle(color: KatokGreyColor, fontSize: 14),
                      ),
                    ),
                    TextFormField(
                      controller: emailCont,
                      focusNode: emailFocusNode,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.next,
                      onFieldSubmitted: (value) {
                        FocusScope.of(context).requestFocus(phoneNumFocusNode);
                      },
                      decoration: InputDecoration(
                        labelText: "Email",
                        labelStyle: TextStyle(color: KatokGreyColor, fontSize: 14),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                      ),
                    ),
                    TextFormField(
                      controller: phoneNumCont,
                      focusNode: phoneNumFocusNode,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.next,
                      onFieldSubmitted: (value) {
                        FocusScope.of(context).requestFocus(passWordFocusNode);
                      },
                      decoration: InputDecoration(
                        labelText: "Phone Number",
                        labelStyle: TextStyle(color: KatokGreyColor, fontSize: 14),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                      ),
                    ),
                    TextFormField(
                      controller: passwordCont,
                      focusNode: passWordFocusNode,
                      obscureText: _showPassword,
                      keyboardType: TextInputType.text,
                      style: TextStyle(color: KatokAppTextColorSecondary),
                      decoration: InputDecoration(
                        labelText: "Password",
                        labelStyle: TextStyle(color: KatokGreyColor, fontSize: 14),
                        suffixIcon: GestureDetector(
                          onTap: () {
                            setState(() {
                              _showPassword = !_showPassword;
                            });
                          },
                          child: Icon(
                              _showPassword
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: KatokColorPrimary,
                              size: 20),
                        ),
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: KatokAppDividerColor)),
                      ),
                    ),
                    24.height,
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
