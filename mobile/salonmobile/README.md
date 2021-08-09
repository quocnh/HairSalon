# salonmobile

Hairsalon mobile version

## Setting up Flutter environment
1. Follow this to install the flutter lib, xcode and android studio simulators
```python
https://www.youtube.com/watch?v=Z2ugnpCQuyw

https://flutter.dev/docs/get-started/install/macos
```
2. Setup flutter in VS Code
```python
- install Dart
- install Flutter
```
3. Setup firebase OTP for android and iOS
```python
https://www.youtube.com/watch?v=3NLP-1KX_Vk
``` Android : 
    - add google-services.json file
    - add " classpath 'com.google.gms:google-services:4.3.8' "  (android/build.gradle)
    - add " apply plugin: 'com.google.gms.google-services' " (android/app/build.gradle)
    - add " 
            implementation "androidx.browser:browser:1.2.0"
            implementation platform('com.google.firebase:firebase-bom:28.1.0') " (android/app/build.gradle)
```
4. Add google map api for Android and iOS
```python
https://stackoverflow.com/questions/37633766/no-such-module-googlemaps-found-however-it-is-installed
https://developers.google.com/maps/documentation/ios-sdk/get-api-key
```
## Troubleshooting if VS does not show up real ios devices
```python
Run flutter devices 
and confirm your device show up
Run flutter daemon -v
```

