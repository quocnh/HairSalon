import 'package:get/get.dart';
import 'package:salonmobile/models/Booking.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

class BookingController extends GetxController{
  var isLoading = true.obs;
  var bookingList = <Booking>[].obs;
  var salon = <Salon>[].obs;

  @override
  void onInit() {
    fetchBookingsFromUserId();
    super.onInit();
  }

  void fetchBookingsFromUserId() async {
    try {
      isLoading(true);
      var booking = await SalonUtilsService().getBookingsFromUserId("60f599f73e31b40a80b4511a");
      if (booking != null) {
        bookingList.value = booking;
        fetchSaLonFromId();
      }
    } finally {
      isLoading(false);
    }
  }
  void fetchSaLonFromId() async {
    try {
      isLoading(true);
      var salonDB = await SalonUtilsService().getSalonFromId(bookingList[0].salonId);
      if (salonDB != null) {
        salon.value = salonDB;
        print(salon.length);
      }
    } finally {
      isLoading(false);
    }
  }
}