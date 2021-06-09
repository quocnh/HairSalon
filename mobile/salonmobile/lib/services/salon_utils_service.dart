import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/http_service.dart';

class SalonUtilsService {
  Future<List<Salon>> getAllSalons() async {
    HttpService hS = new HttpService();
    List response = await hS.sget('salons');
    print('Get all Salons');
    return response.map((json) => new Salon.fromJson(json)).toList();
  }
  getSalonFromId(String salonId) async {
    HttpService hS = new HttpService();
    String para = 'salons/' + salonId;
    var response = await hS.sget(para);
    return response;
  }
}
