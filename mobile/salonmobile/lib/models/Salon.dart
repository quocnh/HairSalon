

class Salon {
  final String id;
  final String name;
  final String address;
  final String latitude;
  final String longitude;
  final List<String> photos;

  Salon({
    this.id,
    this.name,
    this.address,
    this.latitude,
    this.longitude,
    this.photos
  });
  factory Salon.fromJson(Map<String, dynamic> json){
      return Salon(
        id: json['id'],
        name: json['name'],
        address: json['address'],
        latitude: json['latitude'],
        longitude: json['longitude'],
        photos: json['photos'].cast<String>()
      );
    }
}
