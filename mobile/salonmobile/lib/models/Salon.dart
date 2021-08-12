
import 'package:salonmobile/models/Service.dart';

class Salon {
  final String id;
  final String name;
  final String address;
  final String district;
  final String city;
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
        this.district,
        this.city,
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
        district: json['district'],
        city: json['city'],
        latitude: json['latitude'],
        longitude: json['longitude'],
        info: json['info'],
        rating: json['rate'],
        isFavourite: true,
        services: serviceObjs,
        photos: json['photos'].cast<String>());
  }
}
