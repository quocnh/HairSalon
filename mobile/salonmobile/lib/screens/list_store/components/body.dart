import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:salonmobile/models/Product.dart';
import 'package:salonmobile/utils/size_config.dart';


class Body extends StatelessWidget{



  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.builder(
      itemCount: demoProducts.length,
      itemBuilder: (context,i){
        return ListTile(
          leading: Image.asset('${demoProducts[i].images[0]}',width: getProportionateScreenWidth(60),),
          title: Text('${demoProducts[i].title}'),
          subtitle: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              for (var i = 0; i < 3; ++i)
                Icon(Icons.star, color: Colors.yellow[800]) 
            ],
          )
        );
      },
    );
  }
}