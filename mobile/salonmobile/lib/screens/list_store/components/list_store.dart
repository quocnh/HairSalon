import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/utils/size_config.dart';

class ListStore extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
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
                                fontSize:
                                SizeConfig.screenWidth * 0.05,
                                color: Colors.grey))),
                    padding: EdgeInsets.only(
                        bottom: getProportionateScreenHeight(10))),
                Padding(
                  child: Center(
                    child: Text('Hơn 5000 cửa hàng',
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                            fontSize:
                            SizeConfig.screenWidth * 0.05)),
                  ),
                  padding: EdgeInsets.only(
                      bottom: getProportionateScreenHeight(20)),
                ),
                Container(
                  width: getProportionateScreenWidth(325),
                  decoration: BoxDecoration(
                      border: Border(
                          bottom: BorderSide(
                              width: 2, color: Colors.grey[300]))),
                ),
                Container(
                  padding: EdgeInsets.only(
                      top: getProportionateScreenHeight(20),
                      bottom: getProportionateScreenHeight(35)),
                  width: SizeConfig.screenWidth * 0.9,
                  color: Colors.white,
                  child: Row(
                    mainAxisAlignment:
                    MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        child: RichText(
                          text: TextSpan(
                              children: [
                                TextSpan(text:
                                'Hơn 122.000 khách đã làm tại Katok',
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontSize:
                                      SizeConfig.screenWidth * 0.04,
                                      fontWeight: FontWeight.bold),
                                ),
                                TextSpan(text:
                                '. Trung bình họ xếp hạng ở mức 4.7/5 sao.',
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontSize:
                                      SizeConfig.screenWidth * 0.04),
                                ),
                              ]
                          ),
                        ),
                        width: SizeConfig.screenWidth * 0.7,
                      ),
                      Icon(Icons.star, color: Colors.yellow,size: SizeConfig.screenWidth*0.1,)
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
                padding: EdgeInsets.only(bottom: getProportionateScreenHeight(30)),
                color: Colors.white,
                width: double.infinity,
                child: Column(
                  children: [
                    Image.asset(demoProducts[index].images[0]),
                    Container(
                      width: SizeConfig.screenWidth*0.9,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text('${demoProducts[index].title}',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: SizeConfig.screenWidth*0.04)),
                      ),
                    ),
                    Container(
                      width: SizeConfig.screenWidth*0.9,
                      child: Text('${demoProducts[index].description}',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: SizeConfig.screenWidth*0.035
                          )),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: getProportionateScreenHeight(20)),
                      width: getProportionateScreenWidth(325),
                      decoration: BoxDecoration(
                          border: Border(
                              bottom: BorderSide(
                                  width: 2, color: Colors.grey[200]))),
                    ),
                  ],
                ),
              );

            return SizedBox
                .shrink(); // here by default width and height is 0
          },
        ),
        SizedBox(width: getProportionateScreenWidth(20)),
      ],
    );
  }
}