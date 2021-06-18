// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:salonmobile/screens/home/components/search_field.dart';
// import 'package:salonmobile/utils/size_config.dart';
// import 'package:sliding_up_panel/sliding_up_panel.dart';
// import 'package:salonmobile/screens/search_salons/components/map.dart';
//
// class TestSlidingPanel extends StatefulWidget {
//   const TestSlidingPanel({Key key}) : super(key: key);
//
//   @override
//   _TestSlidingPanelState createState() => _TestSlidingPanelState();
// }
//
// class _TestSlidingPanelState extends State<TestSlidingPanel> {
//   bool isCheck = true;
//   @override
//   Widget build(BuildContext context) {
//     BorderRadiusGeometry radius = BorderRadius.only(
//         topLeft: Radius.circular(24), topRight: Radius.circular(24));
//     return SafeArea(
//       child: Scaffold(
//         body: SlidingUpPanel(
//           maxHeight: 600,
//           minHeight: 80,
//           backdropEnabled: true,
//           borderRadius: radius,
//           panel: _createListMenu(),
//           collapsed: Container(
//               decoration:
//               BoxDecoration(color: Colors.blueGrey, borderRadius: radius),
//               child: Center(
//                   child: Column(
//                     children: [
//                       Row(
//                         mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                         children: [
//                           SizedBox(width: 40),
//                           Text('PHAN HỮU TÙNG',
//                               style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
//                           IconButton(
//                               icon: (isCheck == true)
//                                   ? Icon(Icons.grid_view)
//                                   : Icon(Icons.list),
//                               onPressed: () {
//                                 setState(() {
//                                   isCheck = !isCheck;
//                                 });
//                               })
//                         ],
//                       ),
//                       Text('Phan Hữu Tùng', style: TextStyle(fontSize: 15)),
//                     ],
//                   ))),
//           body: Stack(
//             children: [
//               Map(),
//               Container(child: SearchField(),
//                   padding: EdgeInsets.only(top: 20,left: 20))
//             ],
//           ),
//         ),
//       ),
//     );
//   }
//   Widget _createListMenu() {
//     return Column(
//       children: [
//         Container(
//           decoration:
//           BoxDecoration(color: Colors.blueGrey, borderRadius:BorderRadius.only(
//               topLeft: Radius.circular(24), topRight: Radius.circular(24))),
//           child: Center(
//             child: Column(
//               children: [
//                 Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     SizedBox(width: 40),
//                     Text('PHAN HỮU TÙNG',
//                         style: TextStyle(
//                             fontSize: 20,
//                             fontWeight: FontWeight.bold)),
//                     IconButton(
//                         icon: (isCheck == true)
//                             ? Icon(Icons.grid_view)
//                             : Icon(Icons.list),
//                         onPressed: () {
//                           setState(() {
//                             isCheck = !isCheck;
//                           });
//                         })
//                   ],
//                 ),
//                 Text('Phan Hữu Tùng', style: TextStyle(fontSize: 15)),
//                 SizedBox(
//                   height: getProportionateScreenHeight(10),
//                 )
//               ],
//             ),
//           ),
//         ),
//         (isCheck == true)
//             ? Expanded(
//             child: ListView.builder(
//               padding: EdgeInsets.zero,
//               shrinkWrap: true,
//               itemCount: 20,
//               itemBuilder: (context, index) {
//                 return Container(
//                   color: Colors.green,
//                   child: ListTile(
//                     title: Text(
//                         "$index            PHAN HỮU TÙNG"),
//                   ),
//                 );
//               },
//             ))
//             : Expanded(
//             child: GridView.count(
//               padding: EdgeInsets.zero,
//               shrinkWrap: true,
//               crossAxisCount: 2,
//               children: [
//                 Container(
//                   color: Colors.green,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.red,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.white,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.green,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.red,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.black,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.green,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.red,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.white,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.green,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.red,
//                   height: 100,
//                   width: 100,
//                 ),
//                 Container(
//                   color: Colors.black,
//                   height: 100,
//                   width: 100,
//                 )
//               ],
//             ))
//       ],
//     );
//   }
// }
//
//
