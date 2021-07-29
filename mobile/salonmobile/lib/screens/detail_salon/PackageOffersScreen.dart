import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/models/KatokModel.dart';
import 'package:salonmobile/screens/detail_salon/BookAppointmentScreen.dart';
import 'package:salonmobile/utils/AppWidget.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/KatokConstants.dart';
import 'package:salonmobile/utils/KatokDataProvider.dart';
import 'package:salonmobile/utils/KatokImages.dart';
import 'package:salonmobile/utils/size_config.dart';



class KatokPackageOffersScreen extends StatefulWidget {
  static String tag = '/PackageOffersScreen';

  @override
  KatokPackageOffersScreenState createState() => KatokPackageOffersScreenState();
}

class KatokPackageOffersScreenState extends State<KatokPackageOffersScreen> {
  List<KatokIncludeServiceModel> includeServiceList;

  @override
  void initState() {
    super.initState();
    includeServiceList = getIncludeServicesList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomSheet: Container(
        margin: EdgeInsets.only(left: 16, right: 16, top: 8, bottom: 8),
        width: MediaQuery.of(context).size.width,
        child: RaisedButton(
          padding: EdgeInsets.all(12),
          onPressed: () {
            KatokBookAppointmentScreen().launch(context);
          },
          color: KatokColorPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Text(KatokBtnBookAppointment, style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        ),
      ),
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        leading: GestureDetector(
          onTap: () {
            finish(context);
          },
          child: Icon(Icons.arrow_back),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0.0,
      ),
      body: Stack(
        children: <Widget>[
          Image.asset(
            KatokDashedBoardImage3,
            height: 220,
            fit: BoxFit.cover,
            width: MediaQuery.of(context).size.width,
          ),
          Container(
            margin: EdgeInsets.only(top: 200),
            padding: EdgeInsets.all(16),
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                topRight: Radius.circular(16),
                topLeft: Radius.circular(16),
              ),
              color: Colors.white,
            ),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Personality Girl Event', style: TextStyle(fontSize: 16, color: KatokAppTextColorSecondary, fontWeight: FontWeight.bold)),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text('\$100', style: TextStyle(color: KatokAppTextColorPrimary, decoration: TextDecoration.lineThrough)),
                          8.width,
                          Text('\$89', style: TextStyle(color: KatokColorPrimary, fontWeight: FontWeight.bold, fontSize: 16)),
                        ],
                      ),
                    ],
                  ),
                  8.height,
                  Divider(color: KatokAppDividerColor),
                  Padding(
                    padding: EdgeInsets.only(top: 8, bottom: 16),
                    child: Text(KatokTxtTimeOfEvent, style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold)),
                  ),
                  Row(
                    children: [
                      Text('From', style: TextStyle(color: Colors.grey)),
                      16.width,
                      Text('7:30 AM - June 10,2020', style: TextStyle(color: KatokAppTextColorPrimary)),
                    ],
                  ),
                  16.height,
                  Row(
                    children: [
                      Text('To', style: TextStyle(color: Colors.grey)),
                      35.width,
                      Text('5:30 AM - June 25,2020', style: TextStyle(color: KatokAppTextColorPrimary)),
                    ],
                  ),
                  16.height,
                  Text(KatokTxtServicesInclude, style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 14)),
                  ListView.builder(
                      itemCount: includeServiceList.length,
                      shrinkWrap: true,
                      padding: EdgeInsets.only(top: 16),
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (BuildContext context, int index) {
                        return Container(
                          margin: EdgeInsets.only(bottom: 16),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.white,
                            boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                          ),
                          child: Row(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(10),
                                  bottomLeft: Radius.circular(10),
                                ),
                                child: commonCacheImageWidget(includeServiceList[index].serviceImg, 80, width: 80, fit: BoxFit.cover),
                              ),
                              8.width,
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    includeServiceList[index].serviceName,
                                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: KatokAppTextColorPrimary),
                                  ),
                                  8.height,
                                  Row(
                                    children: [
                                      Text(
                                        includeServiceList[index].time,
                                        style: TextStyle(fontSize: 14, color: KatokAppTextColorSecondary),
                                      ),
                                      8.width,
                                      Text(
                                        '\$${includeServiceList[index].price.toString()}',
                                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: KatokColorPrimary),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        );
                      }),
                  Container(height: getProportionateScreenHeight(50),)
                  //16.height,
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
