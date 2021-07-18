import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:salonmobile/components/item_gridview_search_salons_card.dart';
import 'package:salonmobile/components/item_listview_search_salons_card.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

class ItemList extends StatefulWidget {
  String city;
  ItemList({this.city});
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _ItemList();
  }
}

class _ItemList extends State<ItemList> {
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  bool isCheck = true;
  RefreshController _refreshController = RefreshController(initialRefresh: false);
  GlobalKey _contentKey = GlobalKey();
  GlobalKey _refresherKey = GlobalKey();
  List<Salon> listAllSalons = [];
  int lengthList = 6;

  _onLoading()  async{
     await Future.delayed(Duration(seconds: 2));
    print("On Loading");
    setState(() {
      if(lengthList < listAllSalons.length && listAllSalons.length != 0)
      {
        lengthList = lengthList + 6;
        if(lengthList > listAllSalons.length){
          lengthList = listAllSalons.length;
        }
      }

      _refreshController.loadComplete();
    });
  }
  _onRefresh() async {
    await Future.delayed(Duration(seconds: 2));
    print("On Refresh");
    setState(() {
      lengthList = 6;
      _refreshController.refreshCompleted();
    });
  }
  void loadAllSalonsFromCity() async{
    final results = await SalonUtilsService().getSalonsFromCity(widget.city);
    setState(() {
      listAllSalons = results;
    });
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loadAllSalonsFromCity();
  }

  @override
  Widget build(BuildContext context) {
    BorderRadiusGeometry radius = BorderRadius.only(
        topLeft: Radius.circular(24), topRight: Radius.circular(24));
    // TODO: implement build
    return 
           (listAllSalons != []) 
            ? SlidingUpPanel(
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
                          child: RefreshConfiguration.copyAncestor(
                            enableLoadingWhenFailed: true,
                            context: context,
                            child: SmartRefresher(
                              key: _refresherKey,
                              controller: _refreshController,
                              enablePullUp: true,
                              child: GridView.count(
                                shrinkWrap: true,
                                crossAxisCount: 2,
                                childAspectRatio: getProportionateScreenWidth(
                                    (100) / getProportionateScreenHeight(110)),
                                children: [
                                  ...List.generate(
                                    (listAllSalons.length > 6) ? lengthList : listAllSalons.length,
                                    (index) {
                                      return ItemGridViewSearchSalonsCard(
                                        image: listAllSalons[index].photos[0],
                                        name: listAllSalons[index].name,
                                      );

                                      // return SizedBox.shrink();  here by default width and height is 0
                                    },
                                  ),
                                ],
                              ),
                              physics: BouncingScrollPhysics(),
                              footer: CustomFooter(
                                loadStyle: LoadStyle.ShowWhenLoading,
                                builder: (BuildContext context,LoadStatus mode){
                                  Widget body ;
                                  if(mode==LoadStatus.idle){
                                    body =  Text("No more data");
                                  }
                                  else if(mode==LoadStatus.loading){
                                    body =  CupertinoActivityIndicator();
                                  }
                                  else if(mode == LoadStatus.failed){
                                    body = Text("Load Failed! Click retry!");
                                  }
                                  else if(mode == LoadStatus.canLoading){
                                    body = Text("Load more");
                                  }
                                  else{
                                    body = Text("No more data");
                                  }
                                  return Container(
                                    height: getProportionateScreenHeight(55),
                                    child: Center(child:body),
                                  );
                                },
                              ),
                              onLoading: (){
                                _onLoading();
                              },
                              onRefresh: (){
                                _onRefresh();
                              },
                            ),
                            headerBuilder: () => WaterDropMaterialHeader(
                              backgroundColor: kPrimaryColor,
                            ),
                            footerTriggerDistance: 30,
                          ),
                        )
                      :

                  Expanded(
                          child: RefreshConfiguration.copyAncestor(
                            enableLoadingWhenFailed: true,
                            context: context,
                            child: SmartRefresher(
                              key: _refresherKey,
                              controller: _refreshController,
                              enablePullUp: true,
                              child: ListView.builder(
                                key: _contentKey,
                                  padding: EdgeInsets.zero,
                                  shrinkWrap: true,
                                  itemCount: (listAllSalons.length > 6) ? lengthList : listAllSalons.length ,
                                  itemBuilder: (context, index) {
                                    return ItemListViewSearchSalonsCard(
                                      image: listAllSalons[index].photos[0],
                                      name: listAllSalons[index].name,
                                      address: listAllSalons[index].address,
                                    );
                                  }),
                              physics: BouncingScrollPhysics(),
                              footer: CustomFooter(
                                loadStyle: LoadStyle.ShowWhenLoading,
                                builder: (BuildContext context,LoadStatus mode){
                                  Widget body ;
                                  if(mode==LoadStatus.idle){
                                    body =  Text("No more data");
                                  }
                                  else if(mode==LoadStatus.loading){
                                    body =  CupertinoActivityIndicator();
                                  }
                                  else if(mode == LoadStatus.failed){
                                    body = Text("Load Failed! Click retry!");
                                  }
                                  else if(mode == LoadStatus.canLoading){
                                    body = Text("Load more");
                                  }
                                  else{
                                    body = Text("No more data");
                                  }
                                  return Container(
                                    height: getProportionateScreenHeight(55),
                                    child: Center(child:body),
                                  );
                                },
                              ),
                              onLoading: (){
                                _onLoading();
                              },
                              onRefresh: (){
                                _onRefresh();
                              },
                            ),
                            headerBuilder: () => WaterDropMaterialHeader(
                              backgroundColor: kPrimaryColor,
                            ),
                            footerTriggerDistance: 30,
                          ))
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
              // body: Stack(
              //   children: [
              //     Map(),
              //     Positioned(
              //         left: 0,
              //         top: 0,
              //         right: 0,
              //         child: Padding(
              //             padding: EdgeInsets.symmetric(
              //                 vertical: getProportionateScreenHeight(40),
              //                 horizontal: getProportionateScreenWidth(40)),
              //             child: SearchMap())),
              //   ],
              // ),
            )
            : Text('TRỐNG');
          
          
    
  }


}
