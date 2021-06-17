import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

class HttpService {
  static const String ROOT_URL = 'https://awinst.com:3000';
  static const String HERE_URL =
      'https://cors-anywhere.herokuapp.com/https://geocode.search.hereapi.com/v1/geocode?q=';
  static const String HERE_KEY = 'MdY-VgF6O64ulC_vNxa4bmEvIhrkkH85NIjw4ESTFs8';

  login(String username, String password) async {
    String url = ROOT_URL + '/api' + '/auth/signin';
    print(url);
    HttpClient client = new HttpClient();

    client.badCertificateCallback =
        ((X509Certificate cert, String host, int port) => true);

    Map map = {"username": username, "password": password};

    HttpClientRequest request = await client.postUrl(Uri.parse(url));
    request.headers.set('content-type', 'application/json');
    request.add(utf8.encode(json.encode(map)));
    HttpClientResponse response = await request.close();
    if (response.statusCode == 200) {
      String reply = await response.transform(utf8.decoder).join();
      print(reply);
      return reply;
    } else {
      return Null;
    }
  }

  sget(String params) async {
    String url = ROOT_URL + '/' + params;
    HttpOverrides.global = new MyHttpOverrides();
    var client = http.Client();
    var response = await client.get(Uri.parse(url));
    if (response.statusCode == 200) {
      List jsonString = json.decode(response.body);
      // var jsonMap = json.decode(jsonString);
      return jsonString;
    } else {
      throw Exception('Failed to load the API');
    }
  }
}
