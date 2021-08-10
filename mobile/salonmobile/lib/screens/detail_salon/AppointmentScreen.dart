import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/controllers/booking_controller.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/KatokConstants.dart';
import 'package:salonmobile/utils/KatokImages.dart';

class KatokAppointmentScreen extends StatefulWidget {
  static String tag = '/AppointmentBottomNavigationBarScreen';

  @override
  KatokAppointmentScreenState createState() => KatokAppointmentScreenState();
}

class KatokAppointmentScreenState extends State<KatokAppointmentScreen> with SingleTickerProviderStateMixin {
  bool isSwitched = false;

  DateTime date;
  final bookingController = Get.put(BookingController());

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

  Widget ongoingAppointmentWidget() {
    return Container(
      color: KatokGreyColor.withOpacity(0.1),
      padding: EdgeInsets.all(16),
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
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
            16.height,
            Container(
              padding: EdgeInsets.all(8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: whiteColor,
                boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                        child: Image.asset(KatokDashedBoardImage6, height: 70, width: 130, fit: BoxFit.cover)
                      ),
                      8.width,
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Conado Hair Studio', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                          8.height,
                          Row(
                            children: [
                              Icon(Icons.location_on, size: 14, color: KatokAppTextColorSecondary),
                              Text('301 Dorthy walks,chicago,Us.', style: TextStyle(fontSize: 12, color: KatokGreyColor)),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  8.height,
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    Text('Makeup Marguerite', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                    Text('1:30 - 2:30 PM', style: TextStyle(color: KatokColorPrimary, fontSize: 14)),
                  ]),
                  8.height,
                  Row(
                    children: [
                      Icon(Icons.person, size: 14, color: KatokAppTextColorSecondary),
                      Padding(
                        padding: EdgeInsets.only(left: 4),
                        child: Text('Lettie Neal', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Scan Barcode', style: TextStyle(fontSize: 14, color: KatokAppTextColorSecondary)),
                      Image.asset(KatokBarCodeImg, height: 50, width: 120),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Remind me 1h in advance', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary)),
                      Transform.scale(
                        scale: 0.8,
                        child: CupertinoSwitch(
                          value: isSwitched,
                          activeColor: KatokColorPrimary,
                          onChanged: (value) {
                            setState(() {
                              isSwitched = value;
                            });
                          },
                        ),
                      ),
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

  Widget historyAppointmentWidget() {
    return Obx((){
      if (bookingController.isLoading.value)
        return Center(child: Center(child: CircularProgressIndicator()));
      else
        return Container(
        color: KatokGreyColor.withOpacity(0.1),
        child: ListView.builder(
          itemCount: bookingController.bookingList.length,
          shrinkWrap: true,
          padding: EdgeInsets.all(8),
          itemBuilder: (context, index) {
            return Container(
              margin: EdgeInsets.all(8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: whiteColor,
                boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
              ),
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
                            child: Image.asset(KatokDashedBoardImage6, height: 70, width: 130, fit: BoxFit.cover)
                        ),
                        8.width,
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Conado  Hair Studio',
                              style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold),
                            ),
                            8.height,
                            Row(
                              children: [
                                Icon(Icons.location_on, size: 14, color: KatokAppTextColorSecondary),
                                Text('301 Dorthy walks,chicago,Us.', style: TextStyle(fontSize: 12, color: KatokGreyColor)),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    8.height,
                    Text('Makeup Marguerite', style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                    8.height,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.person, size: 14, color: KatokAppTextColorSecondary),
                            Padding(
                              padding: EdgeInsets.only(left: 4),
                              child: Text('Lettie Neal', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                            ),
                          ],
                        ),
                        Text(bookingController.bookingList[index].bookingDate, style: TextStyle(color: KatokAppTextColorPrimary, fontSize: 14)),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: SafeArea(
        child: Scaffold(
          backgroundColor: whiteColor,
          appBar: TabBar(
            labelColor: KatokColorPrimary,
            unselectedLabelColor: KatokAppTextColorPrimary,
            indicatorColor: KatokColorPrimary,
            onTap: (index) {},
            tabs: [
              Tab(child: Text(KatokTabOngoing, style: TextStyle(fontSize: 14))),
              Tab(child: Text(KatokTabHistory, style: TextStyle(fontSize: 14))),
            ],
          ),
          body: TabBarView(
            children: [
              ongoingAppointmentWidget(),
              historyAppointmentWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
