import 'package:salonmobile/services/http_service.dart';

class SalonUtilsService {
  getAllSalons() async {
    HttpService hS = new HttpService();
    var response = await hS.sget('salons');
    return response;
  }

  getSalonFromId(String salonId) async {
    HttpService hS = new HttpService();
    String para = 'salons/' + salonId;
    var response = await hS.sget(para);
    return response;
  }
}
