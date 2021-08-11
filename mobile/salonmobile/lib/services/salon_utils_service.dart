import 'dart:convert';

import 'package:salonmobile/models/Barber.dart';
import 'package:salonmobile/models/Booking.dart';
import 'package:salonmobile/models/Comment.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/services/http_service.dart';

class SalonUtilsService {
  HttpService hS = new HttpService();

  Future<List<Salon>> getAllSalons() async {
    //HttpService hS = new HttpService();
    List response = await this.hS.sget('salons');
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getAllSalonSuggestions(String query) async {
    //HttpService hS = new HttpService();
    List response = await this.hS.sget('salons');
    return response.map((json) => new Salon.fromJson(json)).where((user) {
      final nameSalon = user.name.toLowerCase();
      final nameQuery = query.toLowerCase();
      return nameSalon.contains(nameQuery);
    }).toList();
  }

  Future<List<Salon>> getSalonsFromCitySuggestions(
      String city, String query) async {
    //HttpService hS = new HttpService();
    List response = await this.hS.sget('salons/city/' + city);
    return response.map((json) => new Salon.fromJson(json)).where((user) {
      final nameSalon = user.name.toLowerCase();
      final nameQuery = query.toLowerCase();
      return nameSalon.contains(nameQuery);
    }).toList();
  }

  Future<List<Salon>> getSalonsFromCity(String city) async {
    //HttpService hS = new HttpService();
    List response = await this.hS.sget('salons/city/' + city);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonsFromCityDistrict(
      String city, String district) async {
    //HttpService hS = new HttpService();
    List response =
        await this.hS.sget('salons/city_district/' + city + '/' + district);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonsFromLocation(String long, String lat) async {
    //HttpService hS = new HttpService();
    List response = await this.hS.sget('salons/location/' + long + '/' + lat);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Salon>> getSalonFromId(String salonId) async {
    //HttpService hS = new HttpService();
    String para = 'salons/' + salonId;
    List response = await this.hS.sget(para);
    return response.map((json) => new Salon.fromJson(json)).toList();
  }

  Future<List<Barber>> getBarbersFromSalonId(String salonId) async {
    //HttpService hS = new HttpService();
    String para = 'barbers/salonId/' + salonId;
    List response = await this.hS.sget(para);
    return response.map((json) => new Barber.fromJson(json)).toList();
  }

  Future<List<Comment>> getCommentsFromSalonId(String salonId) async {
    //HttpService hS = new HttpService();
    String para = 'comments/salon/' + salonId;
    List response = await this.hS.sget(para);
    return response.map((json) => new Comment.fromJson(json)).toList();
  }

  Future<List<User>> getUserInfo(String userId) async {
    //HttpService hS = new HttpService();
    String para = 'api/user/getUser/' + userId;
    List response = await this.hS.sget(para);
    return response.map((json) => new User.fromJson(json)).toList();
  }

  Future<User> login(String username, String password) async {
    //HttpService hS = new HttpService();
    String para = 'api/auth/signin';
    Map data = {"username": username, "password": password};
    String body = json.encode(data);
    var response = await this.hS.slogin(para, body);
    if (response != null) {
      User user = new User(
        id: response['id'],
        username: response['username'],
        password: response['password'],
        accessToken: response['accessToken'],
        email: response['email'],
      );
      return user;
    } else {
      return null;
    }
  }

  Future<void> addNewComment(Comment comment) async {
    //HttpService hS = new HttpService();
    String para = 'comments';
    Map data = {
      'salonId': comment.salonId,
      'userId': comment.userId,
      'createdDate': comment.date,
      'content': comment.content,
      'rating': comment.rating,
      'photos': comment.image,
    };
    String body = json.encode(data);
    var response = await this.hS.spost(para, body);
    //print("${response.statusCode}");
    //print("${response.body}");
    print(response);

    return;
  }

  Future<List<Booking>> getBookingsFromUserId(String userId) async {
    String para = 'bookings/user/' + userId;
    List response = await this.hS.sget(para);
    return response.map((json) => new Booking.fromJson(json)).toList();
  }

  Future<List<Booking>> createBooking(Booking booking) async {
    //HttpService hS = new HttpService();
    String para = 'bookings';
    Map data = {
      '_salonId': booking.salonId,
      '_userId': booking.userId,
      '_barberId': booking.barberId,
      'createdDate': booking.createdDate,
      'bookingDate': booking.bookingDate,
      'bookingTime': booking.bookingTime,
      'info': booking.info,
      'status': booking.status,
    };
    String body = json.encode(data);
    List response = await this.hS.spost(para, body);
    print("${response[0].statusCode}");
    print("${response[0].body}");
    return response.map((json) => new Booking.fromJson(json)).toList();
  }
}
