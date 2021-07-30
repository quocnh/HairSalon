import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

class SalonController extends GetxController {
  var isLoading = true.obs;
  var salonList = <Salon>[].obs;
  var salonFromLocationList = <Salon>[].obs;
  var latitude = RxDouble(0);
  var longitude = RxDouble(0);

  @override
  void onInit() {
    fetchSalons();
    getCurrentLocation();
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

  void getCurrentLocation() async {
    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);
    var lastPosition = await Geolocator.getLastKnownPosition();
    print(lastPosition);
    latitude.value = position.latitude;
    longitude.value = position.longitude;
    fetchSalonsFromLocation();
  }

  void fetchSalonsFromLocation() async {
    try {
      isLoading(true);
      var salons = await SalonUtilsService().getSalonsFromLocation(
          longitude.value.toString(), latitude.value.toString());
      if (salons != null) {
        salonFromLocationList.value = salons;
      }
    } finally {
      isLoading(false);
    }
  }
}