class GlobalState {
  final Map<dynamic, dynamic> _data = <dynamic, dynamic>{};

  static GlobalState instance = GlobalState._();
  GlobalState._();

  set(dynamic key, dynamic value) => _data[key] = value;
  get(dynamic key) => _data[key];
}

class GlobalStringState {
  final Map<String, dynamic> _data = <String, dynamic>{};

  static GlobalStringState instance = GlobalStringState._();
  GlobalStringState._();

  set(String key, dynamic value) => _data[key] = value;
  get(String key) => _data[key];
}