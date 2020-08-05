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
=> Connect to database: url = 'mongodb://localhost:27017/salondbmanager'
```

4. Install express
```python
 npm install express
 ```
5. Install Angular dependency 
```python
npm install --save-dev @angular-devkit/build-angular
```
# how to run
1. How to run frontend > cd frontend > npm start
2. How to run backend > cd backend > nodemon app.js
