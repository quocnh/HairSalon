
import 'package:salonmobile/models/Service.dart';

class Salon {
  final String id;
  final String name;
  final String address;
  final String latitude;
  final String longitude;
  final String info;
  final int rating;
  final bool isFavourite;
  final List<Service> services;
  final List<String> photos;

  Salon(
      {
        this.id,
        this.name,
        this.address,
        this.latitude,
        this.longitude,
        this.info,
        this.rating,
        this.isFavourite,
        this.services,
        this.photos});
  factory Salon.fromJson(Map<String, dynamic> json) {
    var serviceObjsJson = json['services'] as List;
    List<Service> serviceObjs = serviceObjsJson.map((tagJson) => new Service.fromJson(tagJson)).toList();

    return Salon(
        id: json['_id'],
        name: json['name'],
        address: json['address'],
        latitude: json['latitude'],
        longitude: json['longitude'],
        info: json['info'],
        rating: json['rate'],
        isFavourite: true,
        services: serviceObjs,
        photos: json['photos'].cast<String>());
  }
}
