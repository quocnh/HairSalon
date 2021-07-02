import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:salonmobile/models/Salon.dart';
import 'package:salonmobile/services/salon_utils_service.dart';
import 'package:salonmobile/utils/size_config.dart';

class Search extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _Search();
  }
}

class _Search extends State<Search> {
  final URL_IMAGE = 'https://awinst.com:3000/app/';
  final cacheManager = CacheManager(Config(
    'customCache',
    stalePeriod: Duration(days: 1),
  ));
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    // TODO: implement build
    return Container(
        width: SizeConfig.screenWidth * 0.6,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15),
        ),
        child: TypeAheadField<Salon>(
          hideSuggestionsOnKeyboardHide: false,
          textFieldConfiguration: TextFieldConfiguration(
              decoration: InputDecoration(
                  contentPadding: EdgeInsets.symmetric(
                      horizontal: getProportionateScreenWidth(20),
                      vertical: getProportionateScreenWidth(9)),
                  border: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  hintText: "Search salons",
                  prefixIcon: Icon(Icons.search))),
          suggestionsCallback: SalonUtilsService().getAllSalonSuggestions,
          itemBuilder: (context, Salon suggestion) {
            final salons = suggestion;
            return ListTile(
              onTap: (){
                print(salons.name);
              },
                leading: Container(
                  width: getProportionateScreenWidth(50),
                  height: getProportionateScreenHeight(50),
                  child: ClipRRect(
                      borderRadius: BorderRadius.all(
                          Radius.circular(10)),
                    child: CachedNetworkImage(
                        cacheManager: cacheManager,
                        imageUrl: URL_IMAGE + salons.photos[0],
                        fit: BoxFit.cover,
                        placeholder: _loader,
                        errorWidget: _error),
                  )
                ),
                  title: Text(salons.name));
            
          },
          onSuggestionSelected: (Salon suggestion) {},
          noItemsFoundBuilder: (context) {
            return Center(child: Text("No salons found"));
          },
        ));
  }
}
Widget _loader(BuildContext context, String url) {
  return Center(child: CircularProgressIndicator());
}
Widget _error(BuildContext context, String url, dynamic error) {
  return Center(child: Text('ERROR'));
}
