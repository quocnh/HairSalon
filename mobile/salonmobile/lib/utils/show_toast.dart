import 'package:flutter/material.dart';

void showToast(BuildContext context, {String text}) {
  final scaffold = Scaffold.of(context);
  scaffold.removeCurrentSnackBar();
  scaffold.showSnackBar(
    SnackBar(
      content: Text(text),
      action: SnackBarAction(
          label: 'UNDO', onPressed: scaffold.hideCurrentSnackBar),
    ),
  );
}
