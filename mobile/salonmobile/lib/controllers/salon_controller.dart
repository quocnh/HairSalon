import 'package:get/get.dart';
import 'package:get/get_connect.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

class SalonController extends GetxController {
  var salonList = <Salon>[].obs;
  var isLoading = true.obs;
  @override
  void onInit() {
    fetchSalons();
    super.onInit();
  }
  void fetchSalons() async {
    try {
      isLoading(true);
      var salons = await SalonUtilsService().getAllSalons();
      if (salons != null) {
        salonList.value = salons;
      }
    } finally {
      isLoading(false);
    }
  }


}