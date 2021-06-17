import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
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
  List<Salon> listSalons = store.get('listSalons');
  bool isCheck = true;
  

  

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return DraggableScrollableSheet(
      initialChildSize: 0.8,
        builder: (context, controller){
      return Column(
        children: [
          Container(
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
                  Padding(
                      child: Center(
                          child: Text('_____',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: SizeConfig.screenWidth * 0.05,
                                  color: Colors.grey))),
                      padding: EdgeInsets.only(bottom: getProportionateScreenHeight(0))),
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
                                    fontSize: SizeConfig.screenWidth * 0.05)),
                            IconButton(
                                onPressed: () {
                                  setState(() {
                                    isCheck = !isCheck;
                                  });
                                  print("PHAN HUU TUNG");
                                },
                                icon: (isCheck == true) ? Icon(Icons.list) : Icon(Icons.grid_view))
                          ],
                        )),
                    padding:
                    EdgeInsets.only(bottom: getProportionateScreenHeight(15)),
                  ),
                  // Container(
                  //   width: getProportionateScreenWidth(325),
                  //   decoration: BoxDecoration(
                  //       border: Border(
                  //           bottom:
                  //           BorderSide(width: 2, color: Colors.grey[300]))),
                  // ),
                  // SizedBox(height: getProportionateScreenHeight(20)),
                  // Container(
                  //   padding: EdgeInsets.only(
                  //       top: getProportionateScreenHeight(20),
                  //       bottom: getProportionateScreenHeight(35)),
                  //   width: SizeConfig.screenWidth * 0.9,
                  //   color: Colors.white,
                  //   child: Row(
                  //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //     children: [
                  //       Container(
                  //         child: RichText(
                  //           text: TextSpan(children: [
                  //             TextSpan(
                  //               text: 'Hơn 122.000 khách đã làm tại Katok',
                  //               style: TextStyle(
                  //                   color: Colors.black,
                  //                   fontSize: SizeConfig.screenWidth * 0.04,
                  //                   fontWeight: FontWeight.bold),
                  //             ),
                  //             TextSpan(
                  //               text: '. Trung bình họ xếp hạng ở mức 4.7/5 sao.',
                  //               style: TextStyle(
                  //                   color: Colors.black,
                  //                   fontSize: SizeConfig.screenWidth * 0.04),
                  //             ),
                  //           ]),
                  //         ),
                  //         width: SizeConfig.screenWidth * 0.7,
                  //       ),
                  //       Icon(
                  //         Icons.star,
                  //         color: Colors.yellow,
                  //         size: SizeConfig.screenWidth * 0.1,
                  //       )
                  //     ],
                  //   ),
                  // )
                ],
              )),
          (isCheck == true)
              ?
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: GridView.count(
                physics: ScrollPhysics(),
                shrinkWrap: true,
                crossAxisCount: 2,
                children: [
                  ...List.generate(
                    listSalons.length,
                        (index) {
                      return Container(
                        padding: EdgeInsets.only(
                            bottom: getProportionateScreenHeight(30)),
                        color: Colors.white,
                        child: Column(
                          children: [
                            Container(
                              width: getProportionateScreenWidth(160),
                              height: getProportionateScreenHeight(183),
                              child: ClipRRect(
                                  borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                                  child: Image.network(
                                      URL_IMAGE + listSalons[index].photos[0],
                                      fit: BoxFit.cover)),
                            ),
                          ],
                        ),
                      );

                      // return SizedBox.shrink();  here by default width and height is 0
                    },
                  ),
                ],
              ),
            ),
          )
              : Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: [
                  ...List.generate(
                    listSalons.length,
                        (index) {
                      return Container(
                        padding: EdgeInsets.only(
                            right: getProportionateScreenWidth(20),
                            left: getProportionateScreenWidth(20),
                            bottom: getProportionateScreenHeight(20)),
                        color: Colors.white,
                        child: Column(
                          children: [
                            Container(
                              width: getProportionateScreenWidth(400),
                              height: getProportionateScreenHeight(200),
                              child: ClipRRect(
                                  borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                                  child: Image.network(
                                      URL_IMAGE + listSalons[index].photos[0],
                                      fit: BoxFit.cover)),
                            ),
                          ],
                        ),
                      );

                      // return SizedBox.shrink();  here by default width and height is 0
                    },
                  ),
                ],
              ),
            ),
          )
        ],
      );
    });
  }
}
