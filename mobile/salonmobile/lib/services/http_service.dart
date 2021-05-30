import 'dart:convert';
import 'dart:io';

class HttpService {
  String baseAPI = 'https://awinst.com:3000/api';

  login(String username, String password) async {
    String url = this.baseAPI + '/auth/signin';
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
}
