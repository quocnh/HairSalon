

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/utils/AppWidget.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/KatokConstants.dart';
import 'package:salonmobile/utils/KatokImages.dart';
import 'package:salonmobile/utils/KotokWidgets.dart';
import 'package:salonmobile/utils/size_config.dart';

class KatokBookAppointmentScreen extends StatefulWidget {
  static String tag = '/BookAppointmentScreen';

  @override
  KatokBookAppointmentScreenState createState() => KatokBookAppointmentScreenState();
}

class KatokBookAppointmentScreenState extends State<KatokBookAppointmentScreen> {
  DateTime date;
  int currentStep = 0;
  int _radioValue1 = 0;
  Color likeButtonColor = whiteColor;

  void something(int value) {
    setState(() {
      _radioValue1 = value;
    });
  }

  _pickDate() async {
    DateTime time = await showDatePicker(
      context: context,
      initialDate: date,
      firstDate: DateTime(DateTime.now().year - 5),
      lastDate: DateTime(DateTime.now().year + 5),
    );
    if (time != null) {
      setState(() {
        date = time;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    date = DateTime.now();
  }

  @override
  Widget build(BuildContext context) {
    Widget appointmentStepper() {
      return Container(
        width: MediaQuery.of(context).size.width,
        color: KatokGreyColor.withOpacity(0.1),
        child: SingleChildScrollView(
          padding: EdgeInsets.all(8),
          child: Column(
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: ListTile(
                  title: Text('Date : ${date.day}/ ${date.month}/ ${date.year}', style: TextStyle(color: KatokAppTextColorSecondary)),
                  trailing: Icon(Icons.keyboard_arrow_down, color: KatokAppTextColorSecondary),
                  onTap: () => _pickDate(),
                ),
              ),
              Container(
                height: getProportionateScreenHeight(210),
                margin: EdgeInsets.only(top: 8),
                padding: EdgeInsets.all(8),
                color: whiteColor,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          KatokTxtChooseSpecialList,
                          style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          KatokTxtHairStylists,
                          style: TextStyle(color: KatokColorPrimary, fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    8.height,
                    Container(
                      height: getProportionateScreenHeight(160),
                      child: ListView.builder(
                        itemCount: 6,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (BuildContext context, int index) {
                          return Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            shadowColor: Colors.grey.withOpacity(0.3),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.only(topLeft: Radius.circular(10), topRight: Radius.circular(10)),
                                  child: Image.asset(KatokDashedBoardImage6, height: getProportionateScreenHeight(110), width: getProportionateScreenWidth(120), fit: BoxFit.cover),
                                ),
                                Padding(
                                  padding: EdgeInsets.all(8),
                                  child: Text(
                                    'Joseph Drake',
                                    style: TextStyle(fontSize: getProportionateScreenWidth(13), color: KatokAppTextColorSecondary, fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: MediaQuery.of(context).size.width,
                padding: EdgeInsets.all(8),
                margin: EdgeInsets.only(top: 8),
                color: whiteColor,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(KatokTxtAvailableSlot, style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                    8.height,
                    Wrap(
                      spacing: 16.0,
                      children: [
                        raiseButton(btnText: '7:30 - 8:30 AM'),
                        raiseButton(btnText: '9:30 - 10:30 AM'),
                        raiseButton(btnText: '4:30 - 5:30 AM'),
                        raiseButton(btnText: '6:30 - 7:30 AM'),
                        raiseButton(btnText: '1:30 - 2:30 AM'),
                        raiseButton(btnText: '3:30 - 4:30 AM'),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }

    Widget paymentStepper() {
      return SingleChildScrollView(
        child: Container(
          color: KatokGreyColor.withOpacity(0.1),
          padding: EdgeInsets.all(8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'Services',
                style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold),
              ),
              Container(
                margin: EdgeInsets.only(top: 8),
                color: whiteColor,
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            child: Image.asset(KatokDashedBoardImage6, height: getProportionateScreenHeight(70),width: getProportionateScreenWidth(100),),
                          ),
                          8.width,
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Conado Hair Studio',
                                style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold),
                              ),
                              8.height,
                              Row(
                                children: [
                                  Icon(Icons.location_on, size: 12, color: KatokAppTextColorSecondary),
                                  Text('301 Dorthy ,chicago', style: TextStyle(fontSize: 12, color: KatokAppTextColorSecondary)),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                      16.height,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Makeup Marguerite', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                          Text('1:30 - 2:30 PM', style: TextStyle(color: KatokColorPrimary, fontSize: 14)),
                        ],
                      ),
                      16.height,
                      Row(
                        children: [
                          Icon(Icons.person, size: 14, color: KatokAppTextColorSecondary),
                          Padding(
                            padding: EdgeInsets.only(left: 5),
                            child: Text(
                              'Lettie Neal',
                              style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14),
                            ),
                          ),
                        ],
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 16),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('1:30-2:30 PM', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary)),
                            Text('June 15,2020', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary)),
                            Padding(padding: EdgeInsets.only(left: 45), child: Text('\$25', style: TextStyle(fontSize: 14))),
                          ],
                        ),
                      ),
                      8.height,
                      Container(height: 1, width: MediaQuery.of(context).size.width, color: KatokGreyColor.withOpacity(0.3)),
                      Container(
                        margin: EdgeInsets.only(top: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Total Pay', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                            Text('\$25', style: TextStyle(fontSize: 14, color: KatokColorPrimary, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              16.height,
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(KatokTxtPaymentMethods, style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                  Text(KatokTxtAddMethod, style: TextStyle(fontSize: 14, color: KatokColorPrimary, fontWeight: FontWeight.bold)),
                ],
              ),
              8.height,
              Container(
                margin: EdgeInsets.only(top: 8),
                color: whiteColor,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Image.asset(KatokVisaCardImg, height: 40, width: 40),
                          16.width,
                          Text('**** **** *123', style: TextStyle(color: KatokAppTextColorPrimary)),
                        ],
                      ),
                      Radio(value: 0, groupValue: _radioValue1, activeColor: KatokColorPrimary, onChanged: (value) => something(value)),
                    ],
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 8),
                color: whiteColor,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Image.asset(KatokMasterCardImg, height: 40, width: 40),
                          16.width,
                          Text('**** **** *333', style: TextStyle(color: KatokAppTextColorPrimary)),
                        ],
                      ),
                      Radio(
                        value: 1,
                        groupValue: _radioValue1,
                        activeColor: KatokColorPrimary,
                        focusColor: KatokAppTextColorSecondary,
                        onChanged: (value) => something(value),
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                width: MediaQuery.of(context).size.width,
                margin: EdgeInsets.only(top: 8),
                color: whiteColor,
                child: Padding(padding: EdgeInsets.all(16), child: Text('Payment in case', style: TextStyle(color: KatokAppTextColorPrimary))),
              ),
            ],
          ),
        ),
      );
    }

    Widget finishedStepper() {
      return SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.all(8),
          color: KatokGreyColor.withOpacity(0.1),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: EdgeInsets.all(8.0),
                height: MediaQuery.of(context).size.height / 2.5,
                color: whiteColor,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Marguerite Hair Salon', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                        16.height,
                        Row(
                          children: [
                            Icon(Icons.location_on, size: 14, color: KatokAppTextColorSecondary),
                            8.width,
                            Text('301 Dorthy walks,chicago,Us.', style: TextStyle(fontSize: 12, color: KatokAppTextColorSecondary)),
                          ],
                        ),
                        16.height,
                        Text('146566311684641', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    8.height,
                    Container(height: 1, width: MediaQuery.of(context).size.width, color: KatokGreyColor.withOpacity(0.3)),
                    8.height,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Hair Styling', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                        Text('June 15,2020', style: TextStyle(color: KatokColorPrimary, fontSize: 14, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    16.height,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.person, size: 14, color: KatokAppTextColorSecondary),
                            Padding(
                              padding: EdgeInsets.only(left: 8),
                              child: Text('Lettie Neal', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text('1:30 - 2:30 PM', style: TextStyle(color: KatokColorPrimary, fontSize: 14, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                    8.height,
                    Container(height: 1, width: MediaQuery.of(context).size.width, color: KatokGreyColor.withOpacity(0.3)),
                    8.height,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Scan Barcode', style: TextStyle(fontSize: 14, color: KatokAppTextColorSecondary)),
                        Image.asset(KatokBarCodeImg, height: 50, width: 120),
                      ],
                    ),
                  ],
                ),
              ),
              16.height,
              Column(
                children: [
                  Container(
                    width: MediaQuery.of(context).size.width,
                    child: RaisedButton(
                      padding: EdgeInsets.all(12),
                      onPressed: () {},
                      color: KatokColorPrimary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                      child: Text(KatokTxtBookMoreAppointment, style: TextStyle(color: whiteColor, fontSize: 15, fontWeight: FontWeight.bold)),
                    ),
                  ),
                  8.height,
                  Container(
                    width: MediaQuery.of(context).size.width,
                    child: RaisedButton(
                      padding: EdgeInsets.all(12),
                      onPressed: () {},
                      color: whiteColor,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0), side: BorderSide(color: KatokColorPrimary)),
                      child: Text(KatokTxtGoAppointment, style: TextStyle(color: KatokColorPrimary, fontSize: 15, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    }
    Map<int, Color> color =
    {
      50:Color.fromRGBO(136,14,79, .1),
      100:Color.fromRGBO(136,14,79, .2),
      200:Color.fromRGBO(136,14,79, .3),
      300:Color.fromRGBO(136,14,79, .4),
      400:Color.fromRGBO(136,14,79, .5),
      500:Color.fromRGBO(136,14,79, .6),
      600:Color.fromRGBO(136,14,79, .7),
      700:Color.fromRGBO(136,14,79, .8),
      800:Color.fromRGBO(136,14,79, .9),
      900:Color.fromRGBO(136,14,79, 1),
    };
    return Scaffold(
      appBar: AppBar(
        backgroundColor: whiteColor,
        title: Text('Book Appointment', style: TextStyle(color: KatokAppTextColorPrimary, fontSize: 16, fontWeight: FontWeight.bold)),
        centerTitle: true,
        leading: GestureDetector(
          onTap: () {
            finish(context);
          },
          child: Icon(Icons.arrow_back, color: blackColor),
        ),
      ),
      body: Theme(
        data: ThemeData(primarySwatch:MaterialColor(0xFFff6e40, color)),
        child: Stepper(
          type: StepperType.horizontal,
          physics: BouncingScrollPhysics(),
          controlsBuilder: (context, {onStepCancel, onStepContinue}) => Container(
            margin: EdgeInsets.only(top: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Container(
                  width: 140,
                  child: RaisedButton(
                    padding: EdgeInsets.all(12),
                    onPressed: () {
                      if (currentStep < 2) {
                        setState(() {
                          currentStep += 1;
                        });
                      } else {
                        currentStep = 0;
                      }
                    },
                    color: KatokColorPrimary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                    child: Text(
                      KatokBtnContinue,
                      style: TextStyle(color: whiteColor, fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
                Container(
                  width: 140,
                  child: RaisedButton(
                    padding: EdgeInsets.all(12),
                    onPressed: () {
                      if (currentStep > 0) {
                        setState(() {
                          currentStep -= 1;
                        });
                      } else {
                        currentStep = 0;
                        finish(context);
                      }
                    },
                    color: KatokColorPrimary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                    child: Text(KatokBtnCancel, style: TextStyle(color: whiteColor, fontSize: 15, fontWeight: FontWeight.bold)),
                  ),
                )
              ],
            ),
          ),
          steps: [
            Step(
              title: Text(KatokStepperBookAppointment, textAlign: TextAlign.center, style: TextStyle(color: KatokAppTextColorSecondary)),
              content: Container(child: appointmentStepper()),
              isActive: currentStep >= 0,
              state: currentStep >= 0 ? StepState.complete : StepState.disabled,
            ),
            Step(
              title: Text(KatokStepperPayment, textAlign: TextAlign.center, style: TextStyle(color: KatokAppTextColorSecondary)),
              content: paymentStepper(),
              isActive: currentStep >= 0,
              state: currentStep >= 1 ? StepState.complete : StepState.disabled,
            ),
            Step(
              title: Text(KatokStepperFinished, style: TextStyle(color: KatokAppTextColorSecondary)),
              content: finishedStepper(),
              isActive: currentStep >= 0,
              state: currentStep >= 2 ? StepState.complete : StepState.disabled,
            ),
          ],
          currentStep: currentStep,
          onStepTapped: (step) {
            currentStep = step;
          },
        ),
      ),
    );
  }
}
