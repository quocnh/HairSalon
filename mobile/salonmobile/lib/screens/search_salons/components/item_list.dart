import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/components/item_gridview_search_salons_card.dart';
import 'package:salonmobile/components/item_listview_search_salons_card.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/search_salons/components/map.dart';
import 'package:salonmobile/screens/search_salons/components/search_map.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

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

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    BorderRadiusGeometry radius = BorderRadius.only(
        topLeft: Radius.circular(24), topRight: Radius.circular(24));
    // TODO: implement build
    return FutureBuilder<List<Salon>>(
        future: SalonUtilsService().getAllSalons(),
        builder: (context, snapshot) {
          print('${snapshot.data} + PHT');
          print('Hello List Salons');
          if (snapshot.hasData) {
            return SlidingUpPanel(
              maxHeight: getProportionateScreenHeight(600),
              minHeight: getProportionateScreenHeight(85),
              backdropEnabled: true,
              borderRadius: radius,
              panel: Column(
                children: [
                  Container(
                      height: getProportionateScreenHeight(85),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topRight: Radius.circular(40),
                          topLeft: Radius.circular(40),
                        ),
                      ),
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
                                )),
                          ),
                          Padding(
                            child: Center(
                                child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                SizedBox(
                                  width: getProportionateScreenWidth(50),
                                ),
                                Text('Danh sách cửa hàng',
                                    style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        color: Colors.black,
                                        fontSize:
                                            getProportionateScreenWidth(17))),
                                IconButton(
                                    onPressed: () {
                                      setState(() {
                                        isCheck = !isCheck;
                                      });
                                      print("PHAN HUU TUNG");
                                    },
                                    icon: (isCheck == false)
                                        ? Icon(Icons.list)
                                        : Icon(Icons.grid_view))
                              ],
                            )),
                            padding: EdgeInsets.only(
                                top: getProportionateScreenHeight(5),
                                bottom: getProportionateScreenHeight(5)),
                          ),
                        ],
                      )),
                  (isCheck == false)
                      ? Expanded(
                          child: GridView.count(
                            shrinkWrap: true,
                            crossAxisCount: 2,
                            childAspectRatio: getProportionateScreenWidth(
                                (100) / getProportionateScreenHeight(110)),
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
                              itemCount: snapshot.data.length,
                              itemBuilder: (context, index) {
                                return ItemListViewSearchSalonsCard(
                                  image: snapshot.data[index].photos[0],
                                  name: snapshot.data[index].name,
                                  address: snapshot.data[index].address,
                                );
                              }))
                ],
              ),
              collapsed: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topRight: Radius.circular(40),
                      topLeft: Radius.circular(40),
                    ),
                  ),
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
                            )),
                      ),
                      Padding(
                        child: Center(
                            child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(
                              width: getProportionateScreenWidth(50),
                            ),
                            Text('Danh sách cửa hàng',
                                style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    color: Colors.black,
                                    fontSize: getProportionateScreenWidth(17))),
                            IconButton(
                                onPressed: () {
                                  setState(() {
                                    isCheck = !isCheck;
                                  });
                                  print("PHAN HUU TUNG");
                                },
                                icon: (isCheck == true)
                                    ? Icon(Icons.list)
                                    : Icon(Icons.grid_view))
                          ],
                        )),
                        padding: EdgeInsets.only(
                            top: getProportionateScreenHeight(10),
                            bottom: getProportionateScreenHeight(5)),
                      ),
                    ],
                  )),
              body: Stack(
                children: [
                  Map(),
                  Positioned(
                      left: 0,
                      top: 0,
                      right: 0,
                      child: Padding(
                          padding: EdgeInsets.symmetric(
                              vertical: getProportionateScreenHeight(40),
                              horizontal: getProportionateScreenWidth(40)),
                          child: SearchMap())),
                ],
              ),
            );
          } else if (snapshot.hasError) {
            return Text('SERVER ERROR');
          }
          return Center(child: Center(child: CircularProgressIndicator()));
        });
  }
}
