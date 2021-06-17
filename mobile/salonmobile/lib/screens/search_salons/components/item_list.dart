import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:salonmobile/components/item_gridview_search_salons_card.dart';
import 'package:salonmobile/components/item_listview_search_salons_card.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

class ItemList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _ItemList();
  }
}

class _ItemList extends State<ItemList> {
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  bool isCheck = true;
  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Salon>>(
        future: SalonUtilsService().getAllSalons(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return DraggableScrollableSheet(
                maxChildSize: 0.85,
                initialChildSize: 0.6,
                minChildSize: 0.2,
                builder: (context, controller) {
                  return Column(
                    children: [
                      Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.only(
                                topRight: Radius.circular(40),
                                topLeft: Radius.circular(40),
                              ),
                              boxShadow: [
                                BoxShadow(color: Colors.grey, blurRadius: 10.0)
                              ]),
                          width: double.infinity,
                          child: Column(
                            children: [
                              Center(
                                child: Padding(
                                  padding: EdgeInsets.only(
                                      top: getProportionateScreenHeight(15)),
                                  child: Container(
                                    width: getProportionateScreenWidth(50),
                                    height: getProportionateScreenHeight(3),
                                    color: Colors.grey,
                                  ),
                                ),
                              ),
                              Padding(
                                child: Center(
                                    child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    SizedBox(
                                      width: getProportionateScreenWidth(50),
                                    ),
                                    Text('Danh sách cửa hàng',
                                        style: TextStyle(
                                            fontWeight: FontWeight.w700,
                                            color: Colors.black,
                                            fontSize:
                                                getProportionateScreenWidth(
                                                    17))),
                                    IconButton(
                                        onPressed: () {
                                          setState(() {
                                            isCheck = !isCheck;
                                          });
                                        },
                                        icon: (isCheck == true)
                                            ? Icon(Icons.list)
                                            : Icon(Icons.grid_view))
                                  ],
                                )),
                                padding: EdgeInsets.only(
                                    top: getProportionateScreenHeight(10),
                                    bottom: getProportionateScreenHeight(15)),
                              ),
                            ],
                          )),
                      (isCheck == true)
                          ? Expanded(
                              child: GridView.count(
                                controller: controller,
                                shrinkWrap: true,
                                crossAxisCount: 2,
                                children: [
                                  ...List.generate(
                                    snapshot.data.length,
                                    (index) {
                                      return ItemGridViewSearchSalonsCard(
                                        image: snapshot.data[index].photos[0],
                                        name: snapshot.data[index].name,
                                      );
                                      // return SizedBox.shrink();  here by default width and height is 0
                                    },
                                  ),
                                ],
                              ),
                            )
                          : Expanded(
                              child: ListView.builder(
                                  padding: EdgeInsets.zero,
                                  shrinkWrap: true,
                                  controller: controller,

                                  itemCount: snapshot.data.length,
                                  itemBuilder: (context, index) {
                                    return ItemListViewSearchSalonsCard(
                                      image: snapshot.data[index].photos[0],
                                      name: snapshot.data[index].name,
                                    );
                                  }))
                    ],
                  );
                });
          } else if (snapshot.hasError) {
            return Text('SERVER ERROR');
          }
          return Center(child: Center(child: CircularProgressIndicator()));
        });
  }
}

Widget _loader(BuildContext context, String url) {
  return Center(child: CircularProgressIndicator());
}

Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}
