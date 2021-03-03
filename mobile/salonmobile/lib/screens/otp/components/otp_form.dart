import 'package:flutter/material.dart';
import 'package:salonmobile/components/default_button.dart';
import 'package:salonmobile/screens/menu_page_builder/menu_page_builder_screen.dart';
import 'package:salonmobile/services/global_state.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

final GlobalState store = GlobalState.instance;

class OtpForm extends StatefulWidget {
  const OtpForm({
    Key key,
  }) : super(key: key);

  @override
  _OtpFormState createState() => _OtpFormState();
}

class _OtpFormState extends State<OtpForm> {
  FocusNode pin1FocusNode;
  FocusNode pin2FocusNode;
  FocusNode pin3FocusNode;
  FocusNode pin4FocusNode;
  FocusNode pin5FocusNode;
  FocusNode pin6FocusNode;

  TextEditingController code1, code2, code3, code4, code5, code6;

  @override
  void initState() {
    super.initState();
    pin1FocusNode = FocusNode();
    pin2FocusNode = FocusNode();
    pin3FocusNode = FocusNode();
    pin4FocusNode = FocusNode();
    pin5FocusNode = FocusNode();
    pin6FocusNode = FocusNode();
  }

  @override
  void dispose() {
    super.dispose();
    pin1FocusNode.dispose();
    pin2FocusNode.dispose();
    pin3FocusNode.dispose();
    pin4FocusNode.dispose();
    pin5FocusNode.dispose();
    pin6FocusNode.dispose();
  }

  void nextField(String value, FocusNode focusNode) {
    if (value.length == 1) {
      focusNode.requestFocus();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          SizedBox(height: SizeConfig.screenHeight * 0.15),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                  autofocus: true,
                  focusNode: pin1FocusNode,
                  obscureText: true,
                  style: TextStyle(fontSize: 24),
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  decoration: otpInputDecoration,
                  onChanged: (value) {
                    nextField(value, pin2FocusNode);
                    store.set("code1", value);
                  },
                ),
              ),
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                    focusNode: pin2FocusNode,
                    obscureText: true,
                    style: TextStyle(fontSize: 24),
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    decoration: otpInputDecoration,
                    onChanged: (value) {
                      if (value.length <= 0) {
                        FocusScope.of(context).requestFocus(pin1FocusNode);
                      }
                      nextField(value, pin3FocusNode);
                      store.set("code2", value);
                    }),
              ),
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                    focusNode: pin3FocusNode,
                    obscureText: true,
                    style: TextStyle(fontSize: 24),
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    decoration: otpInputDecoration,
                    onChanged: (value) {
                      if (value.length <= 0) {
                        FocusScope.of(context).requestFocus(pin2FocusNode);
                      }
                      nextField(value, pin4FocusNode);
                      store.set("code3", value);
                    }),
              ),
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                    focusNode: pin4FocusNode,
                    obscureText: true,
                    style: TextStyle(fontSize: 24),
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    decoration: otpInputDecoration,
                    onChanged: (value) {
                      if (value.length <= 0) {
                        FocusScope.of(context).requestFocus(pin3FocusNode);
                      }
                      nextField(value, pin5FocusNode);
                      store.set("code4", value);
                    }),
              ),
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                    focusNode: pin5FocusNode,
                    obscureText: true,
                    style: TextStyle(fontSize: 24),
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    decoration: otpInputDecoration,
                    onChanged: (value) {
                      if (value.length <= 0) {
                        FocusScope.of(context).requestFocus(pin4FocusNode);
                      }
                      nextField(value, pin6FocusNode);
                      store.set("code5", value);
                    }),
              ),
              SizedBox(
                width: getProportionateScreenWidth(50),
                child: TextFormField(
                  focusNode: pin6FocusNode,
                  obscureText: true,
                  style: TextStyle(fontSize: 24),
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  decoration: otpInputDecoration,
                  onChanged: (value) {
                    if (value.length <= 0) {
                      FocusScope.of(context).requestFocus(pin5FocusNode);
                    }
                    if (value.length == 1) {
                      pin6FocusNode.unfocus();
                      store.set("code6", value);
                      // Then we need to check is the code is correct or not
                    }
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
