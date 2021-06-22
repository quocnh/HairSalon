import 'dart:math';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/otp/components/otp_form.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';
import 'package:salonmobile/utils/constants.dart';

const double VISIBLE_POSITION = 180;
const double INVISIBLE_POSITION = -380;

class Map extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Map();
  }
}

class _Map extends State<Map> {
  double bottomPosition = INVISIBLE_POSITION;
  List<Salon> listSalons = store.get('listSalons');
  GoogleMapController _controller;
  final CameraPosition _initialPosition = CameraPosition(
      target: LatLng(10.815518357444795, 106.70793665499389), zoom: 10);
  final List<Marker> markers = [];
  String nameSalon = '';
  String addressSalon = '';
  String imgSalon = '';

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setMarkerAllSalons();

  }


  void setMarkerAllSalons() async {
    BitmapDescriptor mapMarker = await BitmapDescriptor.fromAssetImage(
        ImageConfiguration(),
        "assets/images/check.png");
    for (var i = 0; i < listSalons.length; i++) {
      markers.add(Marker(
        icon: mapMarker,
        markerId: MarkerId(i.toString()),
        position: LatLng(double.parse(listSalons[i].latitude),
            double.parse(listSalons[i].longitude)),
        // infoWindow: InfoWindow(
        //     title: listSalons[i].name, snippet: listSalons[i].address),
        onTap: () {
          setState(() {
            nameSalon = listSalons[i].name;
            addressSalon = listSalons[i].address;
            imgSalon = listSalons[i].photos[0];
            this.bottomPosition = VISIBLE_POSITION;
          });
          print('$i' + 'PHAN HUU TUNG');
        },
      ));
    }
  }
  void diaLog(BuildContext context) {
    showDialog(
        context: context,
        builder: (_) {
          return CupertinoAlertDialog(
            title: Text('Go to detail salon screen'),
            actions: [
              CupertinoDialogAction(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text('Xác nhận',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: kPrimaryColor))),
            ],
          );
        });
  }


  void addMarker(cordinate) {
    int id = Random().nextInt(100);
    setState(() {
      markers
          .add(Marker(position: cordinate,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
          markerId: MarkerId(id.toString())));
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Stack(
      children: [
        GoogleMap(
          zoomControlsEnabled: false,
          initialCameraPosition: _initialPosition,
          mapType: MapType.normal,
          onMapCreated: (controller) {
            setState(() {
              _controller = controller;
            });
          },
          markers: Set.from(markers),
          onTap: (cordinate) {
            setState(() {
              this.bottomPosition = INVISIBLE_POSITION;
            });
            _controller.animateCamera(CameraUpdate.newLatLng(cordinate));
            // addMarker(cordinate);
          },
        ),
        AnimatedPositioned(
            duration: Duration(milliseconds: 500),
            curve: Curves.easeInOut,
            left: 0,
            right: 0,
            bottom: this.bottomPosition,
            child: FutureBuilder<List<Salon>>(
                future: SalonUtilsService().getAllSalons(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return InkWell(
                      onTap: (){
                        diaLog(context);
                      },
                      child: Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: getProportionateScreenWidth(10)),
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(50),
                                color: Colors.white),
                            child: Row(
                              children: [
                                Container(padding: EdgeInsets.only(left: getProportionateScreenWidth(10)),
                                  child: ClipOval(
                                    child: CachedNetworkImage(
                                      width: getProportionateScreenWidth(70),
                                            height: getProportionateScreenHeight(80),
                                            cacheManager: cacheManager,
                                            imageUrl: URL_IMAGE + imgSalon,
                                            fit: BoxFit.fill,
                                            placeholder: _loader,
                                            errorWidget: _error)
                                  ),
                                ),
                                Expanded(
                                  child: Container(
                                    padding: EdgeInsets.symmetric(
                                        horizontal:
                                            getProportionateScreenWidth(20),
                                        vertical:
                                            getProportionateScreenHeight(10)),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceAround,
                                      children: [
                                        Text(nameSalon,
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontWeight: FontWeight.bold)),
                                        Text(addressSalon),
                                        Text(
                                          "\$12.01",
                                          style: TextStyle(
                                            fontSize:
                                                getProportionateScreenWidth(16),
                                            fontWeight: FontWeight.w600,
                                            color: kPrimaryColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Container(
                                  height: getProportionateScreenHeight(50),
                                    width:getProportionateScreenWidth(50),
                                    padding: EdgeInsets.only(
                                        right: getProportionateScreenWidth(10)),
                                    child: Image.asset(
                                      "assets/images/check.png"
                                    ))
                              ],
                            ),
                          )),
                    );
                  } else if (snapshot.hasError) {
                    return Text('SERVER ERROR');
                  }
                  return Center(
                      child: Center(child: CircularProgressIndicator()));
                }))
      ],
    );
  }
}

Widget _loader(BuildContext context, String url) {
  return Center(child: CircularProgressIndicator());
}

Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}
