import 'dart:math';
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:salonmobile/models/Barber.dart';
import 'package:salonmobile/models/KatokModel.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/screens/detail_salon/DetailScreen.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/KatokColors.dart';
import 'package:salonmobile/utils/constants.dart';
import 'package:salonmobile/utils/size_config.dart';

double VISIBLE_POSITION = getProportionateScreenHeight(250);
double INVISIBLE_POSITION = -(getProportionateScreenHeight(550));

class Map extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Map();
  }
}

class _Map extends State<Map> {
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  double bottomPosition = INVISIBLE_POSITION;
  List<Salon> listSalons = [];
  GoogleMapController _controller;
  final CameraPosition _initialPosition = CameraPosition(
      target: LatLng(10.815518357444795, 106.70793665499389), zoom: 11);
  final List<Marker> markers = [];
  List<Salon> salonInfoList = [];
  Salon salonInfo;
  String idSalon = '';
  String nameSalon = '';
  String addressSalon = '';
  String imgSalon = '';
  bool reloadMarkers = false;
  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));
  final controllerSuggestion = TextEditingController();
  List<Salon> listEmpty =[];


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setMarkerAllSalons();
  }


  Future<Uint8List> getBytesFromAsset(String path, int width, int height) async {
    ByteData data = await rootBundle.load(path);
    ui.Codec codec = await ui.instantiateImageCodec(data.buffer.asUint8List(), targetWidth: width);
    ui.FrameInfo fi = await codec.getNextFrame();
    return (await fi.image.toByteData(format: ui.ImageByteFormat.png)).buffer.asUint8List();
  }

  void setMarkerAllSalons() async {
    final results = await SalonUtilsService().getAllSalons();
    setState(() {
      listSalons = results;
      print(listSalons);
    });

    final Uint8List markerIcon = await getBytesFromAsset('assets/images/hairdresser.png', getProportionateScreenWidth(80).toInt(), getProportionateScreenHeight(100).toInt());
    for (var i = 0; i < listSalons.length; i++) {
      setState(() {
        markers.add(Marker(
          icon: BitmapDescriptor.fromBytes(markerIcon),
          markerId: MarkerId(i.toString()),
          position: LatLng(double.parse(listSalons[i].latitude),
              double.parse(listSalons[i].longitude)),
          // infoWindow: InfoWindow(
          //     title: listSalons[i].name, snippet: listSalons[i].address),
          onTap: () async{
            setState(() {
              clearMarker();
              reloadMarkers = true;
              setMarkerSearchSalon(listSalons[i].id,listSalons[i].name, listSalons[i].latitude, listSalons[i].longitude, listSalons[i].address, listSalons[i].photos[0]);
              nameSalon = listSalons[i].name;
              addressSalon = listSalons[i].address;
              imgSalon = listSalons[i].photos[0];
              idSalon = listSalons[i].id;
              loadSalonInfo(idSalon);
              this.bottomPosition = VISIBLE_POSITION;
            });
            print('$i' + 'PHAN HUU TUNG');
            print("${listSalons[i].services[0].name}, PHAN HUU TUNG");
          },
        ));
      });
    }
  }
  void setMarkerSearchSalon(String id, String name, String lat, String long, String address, String photos) async{
    final Uint8List markerIcon = await getBytesFromAsset('assets/images/hairdresser.png', getProportionateScreenWidth(120).toInt(), getProportionateScreenHeight(200).toInt());
    _controller.animateCamera(CameraUpdate.newCameraPosition(
        CameraPosition(target: LatLng(double.parse(lat),
            double.parse(long)), zoom: 11.0)));
    setState(() {
      markers.add(Marker(
        icon: BitmapDescriptor.fromBytes(markerIcon),
        markerId: MarkerId(name),
        position: LatLng(double.parse(lat),
            double.parse(long)),
        onTap: () {
          setState(() {
            nameSalon = name;
            addressSalon = address;
            imgSalon = photos;
            idSalon = id;
            loadSalonInfo(idSalon);
            //print("Load babers List ");
            //loadBarberInfo(salonInfo.id);
            //print("$idSalon, PHAN HUU TUNG");
            this.bottomPosition = VISIBLE_POSITION;
          });
        },
      ));
    });
  }
  void clearMarker(){
    setState(() {
      markers.clear();
    });
    print("Clear marker");
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
  void loadSalonInfo(String salonId) async{
    final results = await SalonUtilsService().getSalonFromId(salonId);
    setState(() {
      salonInfoList = results;
      salonInfo = results[0];
      //print(salonInfo.info);
    });
  }
  void _currentLocation() async {
    LocationData currentLocation;
    var location = new Location();
    try {
      currentLocation = await location.getLocation();
    } on Exception {
      currentLocation = null;
    }

    _controller.animateCamera(CameraUpdate.newCameraPosition(
      CameraPosition(
        bearing: 0,
        target: LatLng(currentLocation.latitude, currentLocation.longitude),
        zoom: 17.0,
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Stack(
      children: [
        GoogleMap(
          // myLocationButtonEnabled: true,
          // myLocationEnabled: true,
          // padding: EdgeInsets.only(top: getProportionateScreenHeight(100)),
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
              if(controllerSuggestion.text.isEmpty && reloadMarkers == true){
                this.bottomPosition = INVISIBLE_POSITION;
                clearMarker();
                reloadMarkers = false;
                setMarkerAllSalons();
              }else{
                this.bottomPosition = INVISIBLE_POSITION;
              }
              // controllerSuggestion.text = '';
            });
            _controller.animateCamera(CameraUpdate.newLatLng(cordinate));
            // addMarker(cordinate);
          },
        ),
        Positioned(
            left: 0,
            top: 0,
            right: 0,
            child: Stack(
              children: [
                Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: getProportionateScreenHeight(40),
                        horizontal: getProportionateScreenWidth(70)),

                    /// search suggestion
                    child: Container(
                        decoration: BoxDecoration(
                          color: KatokGreyColor.withOpacity(0.25),
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: TypeAheadField<Salon>(
                          hideSuggestionsOnKeyboardHide: false,
                          textFieldConfiguration: TextFieldConfiguration(
                              controller: controllerSuggestion,
                              onChanged: (query) {
                                if (query.isEmpty) {
                                  setState(() {
                                    this.bottomPosition = INVISIBLE_POSITION;
                                  });
                                  clearMarker();
                                  setMarkerAllSalons();
                                }
                              },
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(
                                      horizontal:
                                          getProportionateScreenWidth(20),
                                      vertical: getProportionateScreenWidth(9)),
                                  border: InputBorder.none,
                                  focusedBorder: InputBorder.none,
                                  enabledBorder: InputBorder.none,
                                  hintText: "Search salons",
                                  hintStyle: TextStyle(color: KatokGreyColor),
                                  prefixIcon: Icon(Icons.search))),
                          suggestionsCallback: (query) async {
                            if (query.isEmpty) {
                              return await null;
                              // return listEmpty;
                            } else {
                              return await SalonUtilsService()
                                  .getAllSalonSuggestions(query);
                            }
                          },
                          itemBuilder: (context, Salon suggestion) {
                            final salons = suggestion;
                            return ListTile(
                                leading: Container(
                                    width: getProportionateScreenWidth(50),
                                    height: getProportionateScreenHeight(50),
                                    child: ClipRRect(
                                      borderRadius:
                                          BorderRadius.all(Radius.circular(10)),
                                      child: CachedNetworkImage(
                                          cacheManager: cacheManager,
                                          imageUrl:
                                              URL_IMAGE + salons.photos[0],
                                          fit: BoxFit.cover,
                                          placeholder: _loader,
                                          errorWidget: _error),
                                    )),
                                title: Text(salons.name));
                          },
                          onSuggestionSelected: (Salon suggestion) {
                            controllerSuggestion.text = suggestion.name;
                            final salons = suggestion;
                            print(salons.name);
                            setState(() {
                              this.bottomPosition = INVISIBLE_POSITION;
                            });
                            clearMarker();
                            setMarkerSearchSalon(
                                salons.id,
                                salons.name,
                                salons.latitude,
                                salons.longitude,
                                salons.address,
                                salons.photos[0]);

                            /// tạo function add marker search, gán salons = salons (khởi tạo)
                          },
                          noItemsFoundBuilder: (context) {
                            return Center(child: Text("No salons found"));
                          },
                        ))),
                Padding(
                    padding: EdgeInsets.only(
                        top: getProportionateScreenHeight(40),
                        right: getProportionateScreenWidth(20)),
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: IconButton(
                          onPressed: _currentLocation,
                          icon: Icon(Icons.my_location_outlined,
                              size: getProportionateScreenWidth(25))),
                    ))
              ],
            )),
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
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => KatokDetailScreen(salonInfo: salonInfo)),
                          );

                      },
                      child: (imgSalon == "") ? Container() : Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: getProportionateScreenWidth(10)),
                          child: Container(
                            padding: EdgeInsets.only(left: getProportionateScreenWidth(10)),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(60),
                                color: Colors.white),
                            child: Row(
                              children: [
                                CachedNetworkImage(imageUrl: URL_IMAGE + imgSalon,
                                    imageBuilder: (context, imageProvider){
                                      return Container(
                                        width: getProportionateScreenWidth(80),
                                        height: getProportionateScreenHeight(80),
                                        decoration: BoxDecoration(
                                            shape: BoxShape.circle,
                                            image: DecorationImage(
                                                image: imageProvider, fit: BoxFit.fill
                                            )
                                        ),
                                      );
                                    },
                                    cacheManager: cacheManager,
                                    placeholder: _loader,
                                    errorWidget: _error)
                                // Container(
                                //       width: getProportionateScreenWidth(80),
                                //       height: getProportionateScreenHeight(80),
                                //       decoration: BoxDecoration(
                                //         shape: BoxShape.circle,
                                //         image: DecorationImage(
                                //           fit: BoxFit.fill,
                                //           image: NetworkImage(URL_IMAGE + imgSalon)
                                //         )
                                //       ),
                                //       // child: CachedNetworkImage(
                                //       //         cacheManager: cacheManager,
                                //       //         imageUrl: URL_IMAGE + imgSalon,
                                //       //         fit: BoxFit.fill,
                                //       //         placeholder: _loader,
                                //       //         errorWidget: _error),
                                // )
                                ,
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
                                            getProportionateScreenWidth(14),
                                            fontWeight: FontWeight.w600,
                                            color: kPrimaryColor,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Container(
                                    height: getProportionateScreenHeight(40),
                                    width:getProportionateScreenWidth(40),
                                    padding: EdgeInsets.only(
                                        right: getProportionateScreenWidth(10)),
                                    child: Image.asset(
                                        "assets/images/hairdresser.png"
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
  return Container(
      width: getProportionateScreenWidth(80),
      height: getProportionateScreenHeight(80),
      child: Center(child: CircularProgressIndicator()));
}
Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}
