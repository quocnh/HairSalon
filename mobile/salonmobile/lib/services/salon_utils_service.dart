import 'package:salonmobile/services/http_service.dart';

class SalonUtilsService {
  getAllSalons() async {
    HttpService hS = new HttpService();

    var response = await hS.sget('salons');
    print('Get all Salons');
    return response;
  }
}
