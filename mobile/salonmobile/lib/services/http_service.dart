import 'dart:io';
import 'dart:convert';

import 'package:http/http.dart';

class HttpService {
  static const String ROOT_URL = 'https://localhost:3000';
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

  sget(String para) async {
    String url = ROOT_URL + '/' + para;
    print(url);
    HttpClient client = new HttpClient();

    client.badCertificateCallback =
        ((X509Certificate cert, String host, int port) => true);

    //Map map = {"username": username, "password": password};

    HttpClientRequest request = await client.getUrl(Uri.parse(url));
    //request.headers.set('content-type', 'application/json');
    //request.add(utf8.encode(json.encode(map)));
    HttpClientResponse response = await request.close();
    if (response.statusCode == 200) {
      String reply = await response.transform(utf8.decoder).join();
      print(reply);
      return reply;
    } else {
      return Null;
    }
  }
}
