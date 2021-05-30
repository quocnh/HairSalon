import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:salonmobile/models/Product.dart';

class Map extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Map();
  }
}

class _Map extends State<Map> {
  GoogleMapController _controller;
  final CameraPosition _initialPosition = CameraPosition(
      target: LatLng(10.815518357444795, 106.70793665499389), zoom: 15);
  final List<Marker> markers = [];


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setMarker();
  }


  void setMarker(){
    for(var i=0; i<demoProducts.length; i++){
      markers.add(Marker(
        markerId: MarkerId(demoProducts[i].titleMarker),
        position: LatLng(demoProducts[i].lat, demoProducts[i].long),
        infoWindow: InfoWindow(
          title: demoProducts[i].titleMarker
        ),
      ));
    }
  }


  void addMarker(cordinate) {
    int id = Random().nextInt(100);
    setState(() {
      markers
          .add(Marker(position: cordinate, markerId: MarkerId(id.toString())));
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return GoogleMap(
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
        _controller.animateCamera(CameraUpdate.newLatLng(cordinate));
        addMarker(cordinate);
      },
    );
  }
}
