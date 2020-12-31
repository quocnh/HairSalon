# hairsalon
# documentation of login mechanism 
```python 
https://www.youtube.com/watch?v=2PPSXonhIck
```
# prerequisite (this guide for macOs environment)
0. Clone the source 
### Backend ### 
1. Install NodeJS
```python
brew install node
```
2. Install MongoDB for MAC (https://medium.com/better-programming/installing-mongodb-on-macos-catalina-aab1cbe0c836)
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

3. Install express
```python
 npm install express
 ```
4. Install multer
```python
npm i multer
```
5. 
```python
npm i consola jsonwebtoken passport passport-jwt cors dotenv bcryptjs
```
6.
cd backend > npm install node-geocoder

### Frontend Angular ###
1. Install Angular
```python
npm install -g @angular/cli
ng serve --open. => build
```
2. Install Angular dependency 
```python
npm install --save-dev @angular-devkit/build-angular body-parser @syncfusion/ej2-angular-calendars
# npm install --save body-parser
# npm install --save @syncfusion/ej2-angular-calendars
```
3. Install calendar
```python
npm install @syncfusion/ej2-angular-calendars
```
4. Install calendar
```python
npm install ng-image-slider --save
```
5. Install light-box
```python
cd frondent > npm install --save ngx-lightbox
```
6. Install angular-ng-autocomplete
```python
cd frondent > npm i angular-ng-autocomplete
```

##################
### how to run ###
##################
1. How to run frontend > cd frontend > npm start
2. How to run backend > cd backend > nodemon app.js
# create a page
```python
ng generate component pages/<"page_name">
```


#############################
### How to backup mongodb ###
#############################

# import/export mongodb
```python
mongoimport --host="localhost" --port=27017 --collection=salonowners --db=salondbmanager --file=salonowners.json
mongoexport --host="localhost" --port=27017 --collection=salonowners --db=salondbmanager --out=salonowners.json
```
or

# dump/restore for all db from mongdbs
1. download mongodump, mongorestore at https://www.mongodb.com/try/download/database-tools
2. 
 + backup:  mongodump -d salondbmanager -o dumpname
 + restore: mongorestore -d salondbmanager dumpname/salondbmanager

# Enable Search nearby for Mongodb <https://docs.mongodb.com/manual/tutorial/geospatial-tutorial/>
# -> Create index for location by mongodb command:
> db.salons.createIndex({ location: "2dsphere" })


# deploying angular app in production
```python
- remove root url (localhost)
- create a .htaccess in html apache folder 
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
