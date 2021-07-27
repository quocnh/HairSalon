import 'package:salonmobile/models/Barber.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/models/Service.dart';
import 'package:salonmobile/services/http_service.dart';

class SalonUtilsService {

  Future<List<Salon>> getAllSalons() async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons');
    return response.map((json) => new Salon.fromJson(json)).toList();
  }
  Future<List<Salon>> getAllSalonSuggestions(String query) async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons');
    return response.map((json) => new Salon.fromJson(json)).where((user) {
      final nameSalon = user.name.toLowerCase();
      final nameQuery = query.toLowerCase();
      return nameSalon.contains(nameQuery);
    }).toList();
  }
  Future<List<Salon>> getSalonsFromCitySuggestions(String city,String query) async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons/city/' + city);
    return response.map((json) => new Salon.fromJson(json)).where((user) {
      final nameSalon = user.name.toLowerCase();
      final nameQuery = query.toLowerCase();
      return nameSalon.contains(nameQuery);
    }).toList();
  }

  Future<List<Salon>> getSalonsFromCity(String city) async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons/city/' + city);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonsFromCityDistrict(String city, String district) async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons/city_district/' + city + '/' + district);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonsFromLocation(String long, String lat) async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons/location/' + long + '/' + lat);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonFromId(String salonId) async {
    HttpService hS = new HttpService();
    String para = 'salons/' + salonId;
    List response = await hS.sget(para);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Barber>> getBarbersFromSalonId(String salonId) async {
    HttpService hS = new HttpService();
    String para = 'barbers/salonId/' + salonId;
    List response = await hS.sget(para);
    return response.map((json) => new Barber.fromJson(json)).toList();
  }

}
