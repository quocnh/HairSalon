import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/utils/size_config.dart';
class ItemList extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _ItemList();
  }
}
class _ItemList extends State<ItemList>{
  int _current = 0;
  List<T> map<T>(List list, Function handler){
    List<T> result = [];
    for(var i =0; i< list.length; i++){
      result.add(handler(i, list[i]));
    }
    return result;
  }
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.builder(itemCount: demoProducts.length,
        itemBuilder: (context, index){
          return Container(
            padding: EdgeInsets.only(bottom: getProportionateScreenHeight(30)),
            color: Colors.white,
            width: double.infinity,
            child: Column(
              children: [
                CarouselSlider(
                    items: demoProducts[index].images.map((listImg){
                      return Image.asset(listImg, fit: BoxFit.fill);
                    }).toList(),
                    options: CarouselOptions(
                      onPageChanged: (index, reason){
                        setState(() {
                          _current = index;
                        });
                      },
                    )),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: map<Widget>(demoProducts[index].images , (index, url){
                    return Container(
                      height: 10,
                      width: 10,
                      margin: EdgeInsets.only(right: getProportionateScreenWidth(7), left: getProportionateScreenWidth(7), bottom: getProportionateScreenHeight(20)),
                      decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _current == index ? Colors.grey[800] : Colors.grey[400]
                      ),
                    );
                  }),
                ),
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
        });
  }
}