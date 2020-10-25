# hairsalon
# prerequisite (this guide for macOs environment)
0. Clone the source 
1. Install NodeJS
```python
brew install node
```
2. Install Angular
```python
npm install -g @angular/cli
ng serve --open. => build
```
3. Install MongoDB (https://medium.com/better-programming/installing-mongodb-on-macos-catalina-aab1cbe0c836)
```python
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community 
Note: you can create data/db folder (sudo mkdir -p data/db) anywhere and don't forget to add the path using the command below 
=> sudo mongod --dbpath /System/Volumes/Data/data/db
=> mongod
=> mongo
=> show all db: show dbs
=> select db: use "db_name"
=> show all collections: show collections
=> Connect to database: url = 'mongodb://localhost:27017/salondbmanager'
* Install mongoexport
brew install mongodb/brew/mongodb-database-tools
```

4. Install express
```python
 npm install express
 ```
5. Install Angular dependency 
```python
npm install --save-dev @angular-devkit/build-angular
npm install --save body-parser
npm install --save @syncfusion/ej2-angular-calendars
```
6. Install multer
```python
npm i multer
```
7. Install calendar
```python
npm install @syncfusion/ej2-angular-calendars
```
8. Install calendar
```python
npm install ng-image-slider --save
```
9. Install light-box
```python
cd frondent > npm install --save ngx-lightbox
```
10. 
```python
npm i express consola jsonwebtoken passport passport-jwt cors dotenv
```
# how to run
1. How to run frontend > cd frontend > npm start
2. How to run backend > cd backend > nodemon app.js
# create a page
```python
ng generate component pages/<"page_name">
```
# import/export mongodb
```python
mongoimport --host="localhost" --port=27017 --collection=salonowners --db=salondbmanager --file=salonowners.json
mongoexport --host="localhost" --port=27017 --collection=salonowners --db=salondbmanager --out=salonowners.json
```
