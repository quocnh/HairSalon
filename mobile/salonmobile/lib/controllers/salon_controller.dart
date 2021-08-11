import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';
import 'package:salonmobile/models/Barber.dart';
import 'package:salonmobile/models/Comment.dart';
import 'package:salonmobile/models/KatokModel.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/models/Service.dart';
import 'package:salonmobile/models/User.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/KatokDataProvider.dart';

class SalonController extends GetxController {
  var isLoading = true.obs;
  var salonInfo = Rx(Salon());
  var latitude = RxDouble(0);
  var longitude = RxDouble(0);
  var idSalon = RxString("");
  var citySalon = RxString("");
  var lengthList = RxInt(10);

  var salonList = <Salon>[].obs;
  var salonCityList = <Salon>[].obs;
  var salonFromLocationList = <Salon>[].obs;
  var hairStyleList = <KatokHairStyleModel>[].obs;
  var reviewList = <KatokReviewModel>[].obs;
  var categoryList = <KatokCategoryModel>[].obs;
  var offerList = <KatokOfferModel>[].obs;
  var servicesList = <KatokServicesModel>[].obs;
  var makeupList = <KatokMakeUpModel>[].obs;
  var galleryList = <KatokGalleryModel>[].obs;


  final URL_IMAGE = 'https://awinst.com:3000/app/';


  @override
  void onInit() {
    fetchSalons();
    getCurrentLocation();
    super.onInit();
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
  void fetchSalonsOfCity() async {
    try {
      isLoading(true);
      var salons = await SalonUtilsService().getSalonsFromCity(citySalon.value);
      if (salons != null) {
        salonCityList.value = salons;
      }
    } finally {
      isLoading(false);
    }
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
  void fetchSalonDetail(String id) async {
    try {
      isLoading(true);
      var salons = await SalonUtilsService().getSalonFromId(id);
      if (salons != null) {
        salonInfo.value = salons[0];

        categoryList.value = getCategory();
        offerList.value = getOfferList();
        servicesList.value = getServicesList();
        loadHairStyleList(idSalon.value); // hairStyleList
        loadCommentsInfo(idSalon.value); // reviewList
        makeupList.value = getMakeupList();
        galleryList.value = getSalonPhotoList();
      }
    } finally {
      isLoading(false);
    }
  }
  void getIdSalon (String id){
    idSalon.value = id;
    print(idSalon.value);
    fetchSalonDetail(idSalon.value);
  }
  void getCitySalon (String city){
    citySalon.value = city;
    print(citySalon.value);
    fetchSalonsOfCity();
  }

  List<KatokServicesModel> getServicesList() {
    List<KatokServicesModel> sList = [];
      for (int i = 0; i < salonInfo.value.services.length; i++) {
        Service service = salonInfo.value.services[i];
        sList.add(KatokServicesModel(img: service.image,
            serviceName: service.name,
            time: service.time.toString(),
            price: int.parse(service.price),
            radioVal: i + 1));
      }
    return sList;
  }
  List<KatokGalleryModel> getSalonPhotoList() {
    List<KatokGalleryModel> galleryList = <KatokGalleryModel>[];
    if(salonInfo == null) {
      galleryList = getGalleryList();
    } else {
      for(int i = 0; i < salonInfo.value.photos.length; i++) {
        // String salonPhoto = URL_IMAGE + salonInfo.photos[i];
        // print(salonPhoto);
        galleryList.add(KatokGalleryModel(img: URL_IMAGE + salonInfo.value.photos[i]));
      }
    }
    return galleryList;
  }
  List<KatokHairStyleModel> getHairStyleList(List<Barber> barberList) {
    List<KatokHairStyleModel> bbList = <KatokHairStyleModel>[];
    if(barberList == null) {
      // bbList = getDefaultHairStyleList();
    } else {
      for(int i = 0; i < barberList.length; i++) {
        // String salonPhoto = URL_IMAGE + salonInfo.photos[i];
        // print(salonPhoto);
        bbList.add(KatokHairStyleModel(img: URL_IMAGE + barberList[i].avatar, name:barberList[i].firstname + barberList[i].lastname));
      }
    }
    return bbList;
  }
  List<KatokReviewModel> getCommentList(List<Comment> commentList, List<User> userList) {
    List<KatokReviewModel> cmList = <KatokReviewModel>[];
    //Load user_profile
    print("Number of comments list: " + commentList.length.toString());
    for(int i = 0; i < commentList.length; i++) {
      var name = userList[i].firstname + " " + userList[i].lastname;
      cmList.add(KatokReviewModel(img: userList[i].avatar ?? "assets/images/default-avatar.png", name: name, rating: 5.0, day: commentList[i].date, review: commentList[i].content));
    }

    return cmList;
  }
  void loadHairStyleList(String salonId) async{
    try {
      isLoading(true);
      final results = await SalonUtilsService().getBarbersFromSalonId(salonId);
      hairStyleList.value = getHairStyleList(results);
    } finally {
      isLoading(false);
    }
  }
  void loadCommentsInfo(String salonId) async{
    try {
      List<User> userList = [];
      final results = await SalonUtilsService().getCommentsFromSalonId(salonId);
      for(int i = 0; i < results.length; i++){
        final ul = await SalonUtilsService().getUserInfo(results[i].userId);
        userList.add(ul[0]);
      }
      print(results[0].content);
      reviewList.value = getCommentList(results, userList);
    } finally {
      isLoading(false);
    }
  }
  void loadMore()  {
    print("On Load More");
      if(lengthList < reviewList.length && reviewList.length != 0)
      {
        lengthList = lengthList + 10;
        if(lengthList > reviewList.length){
          lengthList.value = reviewList.length;
        }
      }
  }
}
