import 'dart:convert';

import 'package:http/http.dart' as http;



class HttpService {
  static const String ROOT_URL = 'https://awinst.com:3000';
  static const String HERE_URL =
      'https://cors-anywhere.herokuapp.com/https://geocode.search.hereapi.com/v1/geocode?q=';
  static const String HERE_KEY = 'MdY-VgF6O64ulC_vNxa4bmEvIhrkkH85NIjw4ESTFs8';
  var client = http.Client();

  // GET
  sget(String params) async {
    String url = ROOT_URL + '/' + params;
    //HttpOverrides.global = new MyHttpOverrides();

    var response = await this.client.get(Uri.parse(url));
    if (response.statusCode == 200) {
      List jsonString = json.decode(response.body);
      // var jsonMap = json.decode(jsonString);
      return jsonString;
    } else {
      throw Exception('Failed to load the API');
    }
  }
  // POST
  spost(String params, String map) async {
    String url = ROOT_URL + '/' + params;
    //HttpOverrides.global = new MyHttpOverrides();

    var response = await this.client.post(
      Uri.parse(url),
      headers: {"Content-Type": "application/json"},
      body: map
    );
    print(response);
    if (response.statusCode == 200) {
      var jsonString = json.decode(response.body);
      // var jsonMap = json.decode(jsonString);
      return jsonString;
    } else {
      throw Exception('Failed to load the API');
    }
  }

  slogin(String params, String map) async {
    String url = ROOT_URL + '/' + params;
    //HttpOverrides.global = new MyHttpOverrides();

    var response = await this.client.post(
        Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: map
    );

    if (response.statusCode == 200) {
      var jsonString = json.decode(response.body);
      // var jsonMap = json.decode(jsonString);
      return jsonString;
    } else {
      return null;
      // throw Exception('Failed to load the API');
    }
  }
}
