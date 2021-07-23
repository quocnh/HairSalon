import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:flutter_svg/svg.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:salonmobile/models/KatokModel.dart';
import 'package:salonmobile/screens/detail_salon/PackageOffersScreen.dart';
import 'package:salonmobile/utils/AppWidget.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/KatokConstants.dart';
import 'package:salonmobile/utils/KatokDataProvider.dart';
import 'package:salonmobile/utils/KatokImages.dart';
import 'package:salonmobile/utils/flutter_rating_bar.dart';
import 'package:salonmobile/utils/size_config.dart';


class KatokDetailScreen extends StatefulWidget {
  static String tag = '/NewSliverCustom';

  @override
  KatokDetailScreenState createState() => KatokDetailScreenState();
}

class KatokDetailScreenState extends State<KatokDetailScreen> with SingleTickerProviderStateMixin {
  int _radioValue1 = 0;
  TabController controller;

  List<KatokGalleryModel> galleryList;
  List<KatokCategoryModel> categoryList;
  List<KatokOfferModel> offerList;
  List<KatokServicesModel> servicesList;
  List<KatokReviewModel> reviewList;
  List<KatokHairStyleModel> hairStyleList;
  List<KatokMakeUpModel> makeupList;

  @override
  void initState() {
    super.initState();
    galleryList = getGalleryList();
    categoryList = getCategory();
    offerList = getOfferList();
    servicesList = getServicesList();
    reviewList = getReviewList();
    hairStyleList = getHairStyleList();
    makeupList = getMakeupList();
  }

  void something(int value) {
    setState(() {
      _radioValue1 = value;
      print(_radioValue1);
    });
  }

  @override
  Widget build(BuildContext context) {
    changeStatusColor(Colors.transparent);
    Widget aboutWidget() {
      return Container(
        padding: EdgeInsets.all(8),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.all(8),
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      KatokTxtInformation,
                      style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                    8.height,
                    Text(KatokDetailTitle, style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(8),
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      KatokTxtContact,
                      style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                    8.height,
                    Row(
                      children: [
                        Icon(Icons.call, size: 16),
                        8.width,
                        Text('+1(325)1256 7592', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                      ],
                    ),
                    8.height,
                    Row(
                      children: [
                        Icon(Icons.web, size: 16),
                        8.width,
                        Text('www.salon.com', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                      ],
                    )
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(8),
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      KatokTxtOpeningTime,
                      style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                    8.height,
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Monday - Friday', style: TextStyle(color: KatokGreyColor, fontSize: 14)),
                        Column(
                          children: [
                            Text('7:30 - 11:30 AM', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                            8.height,
                            Text('7:30 - 11:30 AM', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14))
                          ],
                        )
                      ],
                    ),
                    8.height,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Sunday', style: TextStyle(color: KatokGreyColor, fontSize: 14)),
                        Text('7:30 - 11:30 AM', style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14)),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(16),
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      KatokTxtAddress,
                      style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                    8.width,
                    Text('301 Dorthy walks,chicago,Us.', style: TextStyle(color: KatokColorPrimary, fontSize: 14)),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }

    Widget galleryWidget() {
      return StaggeredGridView.countBuilder(
        crossAxisCount: 4,
        itemCount: galleryList.length,
        padding: EdgeInsets.all(16),
        itemBuilder: (BuildContext context, int index) => ClipRRect(
          borderRadius: BorderRadius.all(Radius.circular(5)),
          child: Image.asset(galleryList[index].img, fit: BoxFit.cover),
        ),
        staggeredTileBuilder: (int index) => new StaggeredTile.count(2, index.isEven ? 2 : 3),
        mainAxisSpacing: 16.0,
        crossAxisSpacing: 16.0,
      );
    }

    Widget serviceWidget() {
      return SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: getProportionateScreenHeight(120),
              child: ListView.builder(
                padding: EdgeInsets.all(getProportionateScreenWidth(8)),
                itemCount: categoryList.length,
                scrollDirection: Axis.horizontal,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    margin: EdgeInsets.all(getProportionateScreenWidth(8)),
                    child: Column(
                      children: <Widget>[
                        SvgPicture.asset(categoryList[index].img, height: getProportionateScreenHeight(33), width: getProportionateScreenWidth(33)),
                        SizedBox(height: getProportionateScreenHeight(8)),
                        Text(categoryList[index].categoryName, style: TextStyle(color: KatokAppTextColorSecondary, fontSize: getProportionateScreenWidth(13)))
                      ],
                    ),
                  );
                },
              ),
            ),
            // 8.height,
            Container(
              padding: EdgeInsets.only(left: 16, right: 16),
              child: Text(KatokTxtPackageOffers, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: KatokAppTextColorPrimary)),
            ),
            Container(
              height: 220,
              child: ListView.builder(
                padding: EdgeInsets.all(8),
                itemCount: offerList.length,
                scrollDirection: Axis.horizontal,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    width: 220,
                    margin: EdgeInsets.all(8),
                    child: Card(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      shadowColor: KatokGreyColor.withOpacity(0.3),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.only(topLeft: Radius.circular(10), topRight: Radius.circular(10)),
                            child: commonCacheImageWidget(offerList[index].img, 100, width: 250, fit: BoxFit.cover),
                          ),
                          Padding(
                            padding: EdgeInsets.all(8),
                            child: Text(
                              offerList[index].offerName,
                              style: TextStyle(fontSize: 14, color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold),
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.only(left: 8, right: 8, bottom: 8),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                Text(
                                  offerList[index].offerDate,
                                  style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14),
                                  textAlign: TextAlign.left,
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    Text(
                                      '\$${offerList[index].offerOldPrice}',
                                      style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14, decoration: TextDecoration.lineThrough),
                                    ),
                                    8.width,
                                    Text(
                                      '\$${offerList[index].offerNewPrice}',
                                      style: TextStyle(color: KatokColorPrimary, fontWeight: FontWeight.bold, fontSize: 16),
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
                },
              ),
            ),
            Container(
              padding: EdgeInsets.only(right: 16, left: 16),
              child: Text(KatokTxtPopularServices, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: KatokAppTextColorPrimary)),
            ),
            ListView.builder(
              itemCount: servicesList.length,
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              padding: EdgeInsets.all(8),
              scrollDirection: Axis.vertical,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  margin: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: whiteColor,
                    boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                  ),
                  child: Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.only(topLeft: Radius.circular(10), bottomLeft: Radius.circular(10)),
                        child:commonCacheImageWidget(servicesList[index].img, 80, width: 80, fit: BoxFit.cover),
                      ),
                      8.width,
                      Column(
                        children: [
                          Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              servicesList[index].serviceName,
                              style: TextStyle(fontWeight: FontWeight.bold, color: KatokAppTextColorPrimary, fontSize: 14),
                            ),
                          ),
                          8.height,
                          Row(
                            children: [
                              Text(
                                servicesList[index].time,
                                style: TextStyle(color: KatokAppTextColorSecondary, fontSize: 14),
                              ),
                              8.width,
                              Text(
                                '\$${servicesList[index].price}',
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: KatokColorPrimary),
                              ),
                            ],
                          ),
                        ],
                      ).expand(),
                      Radio(
                        value: servicesList[index].radioVal,
                        groupValue: _radioValue1,
                        activeColor: KatokColorPrimary,
                        onChanged: (value) => something(value),
                      ),
                    ],
                  ),
                );
              },
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              margin: EdgeInsets.only(left: 16, right: 16, top: 8, bottom: 16),
              child: RaisedButton(
                padding: EdgeInsets.all(12),
                onPressed: () {
                  KatokPackageOffersScreen().launch(context);
                },
                color: KatokColorPrimary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Text(KatokBtnBookAppointment, style: TextStyle(color: whiteColor, fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      );
    }

    Widget reviewWidget() {
      return Container(
        padding: EdgeInsets.all(8),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.all(8),
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: whiteColor,
                  boxShadow: [BoxShadow(color: KatokGreyColor.withOpacity(0.3), offset: Offset(0.0, 1.0), blurRadius: 2.0)],
                ),
                child: Column(
                  children: [
                    Text(
                      KatokTxtReview,
                      style: TextStyle(
                        fontSize: 16,
                        color: KatokAppTextColorPrimary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    8.height,
                    Text(
                      KatokTxtReviewMsg,
                      style: TextStyle(fontSize: 14, color: KatokGreyColor),
                    ),
                    8.height,
                    RatingBar(
                      onRatingUpdate: (rating) {
                        print(rating);
                      },
                      initialRating: 2.5,
                      glow: true,
                      glowColor: KatokGreyColor,
                      direction: Axis.horizontal,
                      itemCount: 5,
                      allowHalfRating: true,
                      minRating: 1,
                      itemPadding: EdgeInsets.symmetric(horizontal: 4),
                      itemBuilder: (context, _) => Icon(
                        Icons.star,
                        color: KatokColorPrimary,
                      ),
                    ),
                    8.height,
                    Row(
                      children: [
                        Container(
                          height: 45,
                          child: TextFormField(
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                              hintText: 'Say something...',
                              hintStyle: TextStyle(color: KatokGreyColor),
                              filled: true,
                              fillColor: KatokGreyColor.withOpacity(0.1),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10.0),
                                ),
                                borderSide: BorderSide(color: whiteColor),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10.0),
                                ),
                                borderSide: BorderSide(color: whiteColor),
                              ),
                            ),
                          ),
                        ).expand(),
                        8.width,
                        Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                            color: KatokColorPrimary,
                          ),
                          child: IconButton(
                            onPressed: () {},
                            icon: Icon(
                              Icons.arrow_forward_ios,
                              color: whiteColor,
                            ),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              ListView.builder(
                itemCount: reviewList.length,
                shrinkWrap: true,
                padding: EdgeInsets.only(top: 0),
                physics: NeverScrollableScrollPhysics(),
                scrollDirection: Axis.vertical,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    margin: EdgeInsets.all(8),
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: whiteColor, boxShadow: [
                      BoxShadow(
                        color: KatokGreyColor.withOpacity(0.3),
                        offset: Offset(0.0, 1.0),
                        blurRadius: 2.0,
                      ),
                    ]),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              backgroundImage: AssetImage(reviewList[index].img),
                              radius: 30,
                            ),
                            8.width,
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  reviewList[index].name,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: KatokAppTextColorPrimary,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                8.height,
                                Text(
                                  reviewList[index].day,
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: KatokGreyColor,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ).expand(),
                            Row(
                              children: [
                                Text(
                                  reviewList[index].rating.toString(),
                                  style: TextStyle(
                                    color: KatokAppTextColorSecondary,
                                    fontSize: 12,
                                  ),
                                ),
                                8.width,
                                Icon(
                                  Icons.star,
                                  color: KatokColorPrimary,
                                ),
                              ],
                            ),
                          ],
                        ),
                        Text(
                          reviewList[index].review,
                          style: TextStyle(
                            color: KatokAppTextColorSecondary,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      );
    }

    Widget specialListsWidget() {
      return Container(
        padding: EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(KatokTxtHairStyle, style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16)),
              Container(
                height: 180,
                child: ListView.builder(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  itemCount: hairStyleList.length,
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (BuildContext context, int index) {
                    return Card(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      margin: EdgeInsets.fromLTRB(0, 8, 16, 8),
                      shadowColor: KatokGreyColor.withOpacity(0.3),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.only(topLeft: Radius.circular(10), topRight: Radius.circular(10)),
                            child:commonCacheImageWidget(hairStyleList[index].img, 110, width: 120, fit: BoxFit.cover),
                          ),
                          Padding(
                            padding: EdgeInsets.all(8),
                            child: Text(
                              hairStyleList[index].name,
                              style: TextStyle(fontSize: 14, color: KatokAppTextColorSecondary),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              Text(KatokTxtMakeupArtist, style: TextStyle(color: KatokAppTextColorPrimary, fontWeight: FontWeight.bold, fontSize: 16)),
              Container(
                height: 180,
                child: ListView.builder(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  itemCount: makeupList.length,
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (BuildContext context, int index) {
                    return Card(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      margin: EdgeInsets.fromLTRB(0, 8, 16, 8),
                      shadowColor: KatokGreyColor.withOpacity(0.3),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.only(topLeft: Radius.circular(10), topRight: Radius.circular(10)),
                            child: commonCacheImageWidget(hairStyleList[index].img, 110, width: 120, fit: BoxFit.cover),
                          ),
                          Padding(
                            padding: EdgeInsets.all(8),
                            child: Text(
                              makeupList[index].name,
                              style: TextStyle(fontSize: 14, color: KatokAppTextColorSecondary),
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
      );
    }

    return DefaultTabController(
      length: 5,
      child: Scaffold(
        body: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
            return <Widget>[
              Container(
                child: SliverAppBar(
                  brightness: Brightness.dark,
                  leading: IconButton(icon: Icon(Icons.arrow_back,color: white),onPressed: (){
                    Navigator.pop(context);
                  },),
                  backgroundColor: KatokColorPrimary,
                  pinned: true,
                  elevation: 2,
                  expandedHeight: 300,
                  flexibleSpace: FlexibleSpaceBar(
                    collapseMode: CollapseMode.parallax,
                    titlePadding: EdgeInsets.all(10),
                    background: Stack(
                      overflow: Overflow.visible,
                      children: [
                        Image.asset(
                          KatokDashedBoardImage6,
                          height: 500,
                          fit: BoxFit.cover,
                        ),
                        Container(
                          margin: EdgeInsets.only(bottom: 35),
                          padding: EdgeInsets.all(8),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  Text(
                                    'Marguerite Cross',
                                    style: TextStyle(
                                      color: whiteColor,
                                      fontSize: 16,
                                    ),
                                    textAlign: TextAlign.left,
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        '4.5',
                                        style: TextStyle(color: whiteColor, fontSize: 16),
                                      ),
                                      IconButton(icon: Icon(Icons.star, color: KatokColorPrimary), onPressed: () {})
                                    ],
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Day Salon', style: TextStyle(color: whiteColor, fontSize: 16), textAlign: TextAlign.left),
                                  Container(
                                    height: 25,
                                    width: 65,
                                    margin: EdgeInsets.only(right: 16),
                                    child: FlatButton(
                                      onPressed: () {},
                                      child: Text(KatokBtnOpen, style: TextStyle(color: whiteColor, fontSize: 14)),
                                      color: KatokColorPrimary,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
                                    ),
                                  )
                                ],
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                    centerTitle: true,
                  ),
                  bottom: TabBar(
                    labelColor: whiteColor,
                    unselectedLabelColor: whiteColor,
                    isScrollable: true,
                    indicatorColor: KatokColorPrimary,
                    tabs: [
                      Tab(
                        child: Align(alignment: Alignment.center, child: Text(KatokTabAbout, style: TextStyle(fontSize: 14))),
                      ),
                      Tab(
                        child: Align(alignment: Alignment.center, child: Text(KatokTabGallery, style: TextStyle(fontSize: 14))),
                      ),
                      Tab(
                        child: Align(alignment: Alignment.center, child: Text(KatokTabServices, style: TextStyle(fontSize: 14))),
                      ),
                      Tab(
                        child: Align(alignment: Alignment.center, child: Text(KatokTabReview, style: TextStyle(fontSize: 14))),
                      ),
                      Tab(
                        child: Align(alignment: Alignment.center, child: Text(KatokTabSalonSpecialList, style: TextStyle(fontSize: 14))),
                      ),
                    ],
                    controller: controller,
                  ),
                  actions: [
                    IconButton(icon: Icon(Icons.call, color: whiteColor, size: 16), onPressed: () {}),
                    IconButton(icon: Icon(Icons.message, color: whiteColor, size: 16), onPressed: () {}),
                  ],
                ),
              ),
            ];
          },
          body: TabBarView(
            children: [
              aboutWidget(),
              galleryWidget(),
              serviceWidget(),
              reviewWidget(),
              specialListsWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
