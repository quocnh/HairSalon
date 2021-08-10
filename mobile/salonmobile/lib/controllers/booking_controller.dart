import 'package:get/get.dart';
import 'package:salonmobile/models/Booking.dart';
import 'package:salonmobile/services/salon_utils_service.dart';

class BookingController extends GetxController{
  var isLoading = true.obs;
  var bookingList = <Booking>[].obs;

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
      }
    } finally {
      isLoading(false);
    }
  }
}