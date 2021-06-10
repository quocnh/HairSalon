import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/utils/size_config.dart';

class ListStore extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _ListStore();
  }
}

class _ListStore extends State<ListStore> {
  int _current = 0;
  List<T> map<T>(List list, Function handler) {
    List<T> result = [];
    for (var i = 0; i < list.length; i++) {
      result.add(handler(i, list[i]));
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return SingleChildScrollView(
      child: Column(
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
                      padding: EdgeInsets.only(
                          bottom: getProportionateScreenHeight(10))),
                  Padding(
                    child: Center(
                      child: Text('Hơn 5000 cửa hàng',
                          style: TextStyle(
                              fontWeight: FontWeight.w700,
                              color: Colors.black,
                              fontSize: SizeConfig.screenWidth * 0.05)),
                    ),
                    padding: EdgeInsets.only(
                        bottom: getProportionateScreenHeight(20)),
                  ),
                  Container(
                    width: getProportionateScreenWidth(325),
                    decoration: BoxDecoration(
                        border: Border(
                            bottom:
                                BorderSide(width: 2, color: Colors.grey[300]))),
                  ),
                  Container(
                    padding: EdgeInsets.only(
                        top: getProportionateScreenHeight(20),
                        bottom: getProportionateScreenHeight(35)),
                    width: SizeConfig.screenWidth * 0.9,
                    color: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          child: RichText(
                            text: TextSpan(children: [
                              TextSpan(
                                text: 'Hơn 122.000 khách đã làm tại Katok',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontSize: SizeConfig.screenWidth * 0.04,
                                    fontWeight: FontWeight.bold),
                              ),
                              TextSpan(
                                text:
                                    '. Trung bình họ xếp hạng ở mức 4.7/5 sao.',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontSize: SizeConfig.screenWidth * 0.04),
                              ),
                            ]),
                          ),
                          width: SizeConfig.screenWidth * 0.7,
                        ),
                        Icon(
                          Icons.star,
                          color: Colors.yellow,
                          size: SizeConfig.screenWidth * 0.1,
                        )
                      ],
                    ),
                  )
                ],
              )),
          ...List.generate(
            demoProducts.length,
            (index) {
              if (demoProducts[index].isPopular)
                return Container(
                  padding:
                      EdgeInsets.only(bottom: getProportionateScreenHeight(30)),
                  color: Colors.white,
                  width: double.infinity,
                  child: Column(
                    children: [
                      CarouselSlider(
                          items: demoProducts[index].images.map((listImg) {
                            return Image.asset(listImg, fit: BoxFit.fill);
                          }).toList(),
                          options: CarouselOptions(
                            onPageChanged: (index, reason) {
                              setState(() {
                                /// dùng listview build ra nhưng item dùng cái carouselSlider thì mỗi item phải có 1 biến check riêng
                                  _current = index;
                                /// dùng listview build ra nhưng item dùng cái carouselSlider thì mỗi item phải có 1 biến check riêng
                              });
                            },
                          )),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: map<Widget>(demoProducts[index].images,
                            (index, url) {
                          return Container(
                            height: 10,
                            width: 10,
                            margin: EdgeInsets.only(
                                right: getProportionateScreenWidth(7),
                                left: getProportionateScreenWidth(7),
                                bottom: getProportionateScreenHeight(20)),
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: _current == index
                                    ? Colors.grey[800]
                                    : Colors.grey[400]),
                          );
                        }),
                      ),
                      Container(
                        width: SizeConfig.screenWidth * 0.9,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('${demoProducts[index].title}',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: SizeConfig.screenWidth * 0.04)),
                        ),
                      ),
                      Container(
                        width: SizeConfig.screenWidth * 0.9,
                        child: Text('${demoProducts[index].description}',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: SizeConfig.screenWidth * 0.035)),
                      ),
                      Container(
                        padding: EdgeInsets.only(
                            top: getProportionateScreenHeight(20)),
                        width: getProportionateScreenWidth(325),
                        decoration: BoxDecoration(
                            border: Border(
                                bottom: BorderSide(
                                    width: 2, color: Colors.grey[200]))),
                      ),
                    ],
                  ),
                );

              return SizedBox.shrink(); // here by default width and height is 0
            },
          ),
          SizedBox(width: getProportionateScreenWidth(20)),
        ],
      ),
    );
  }
}
