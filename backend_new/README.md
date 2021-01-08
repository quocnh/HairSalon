
### Project structure ###

![alt text](https://bezkoder.com/wp-content/uploads/2020/02/node-js-mongodb-jwt-authentication-architecture.png)
![alt text](https://bezkoder.com/wp-content/uploads/2020/02/node-js-mongodb-jwt-authentication-flow.png)
![alt text](https://bezkoder.com/wp-content/uploads/2020/07/angular-10-jwt-authentication-overview.png)

### Project setup ###)


### how to run ###

1. How to run frontend > cd frontend > npm start
```python
  Install NodeJs from NodeJs Official Page.
Open Terminal
Go to your file project
Run in terminal: npm install -g @angular/cli
Then: npm install
THen: npm start
```
2. How to run backend > cd backend > nodemon app.js
```python
npm init
npm install
```
### Connect remote mongodb server ###

* Follow this to config mongodb and check db status (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
-> make sure mongodb server is activated (sudo systemctl status mongod)

* download this mongoshell to debug on remote server
https://downloads.mongodb.org/osx/mongodb-shell-osx-ssl-x86_64-3.6.2.tgz
```python 
./mongod localhost
./mondod 171.244.39.13
```


* config "/etc/mongod.conf" file

Add the following lines
```python
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1, 171.244.39.13
  
  security:
   authorization: 'enabled'
```
* config firewall on remote server

First, create a firewalld service configuration file on the master build server called "/etc/firewalld/services/mongod.xml" with the following contents:
```python 
<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>mongod</short>
  <description>MongoDB default port for mongod and mongos instances.</description>
  <port protocol="tcp" port="27017"/>
</service>
```
* to define the service, and then run the commands
```python
root@761362-01:~# restorecon /etc/firewalld/services/mongod.xml
root@761362-01:~# chmod 640 /etc/firewalld/services/mongod.xml
root@761362-01:~# firewall-cmd --reload
success
```
* Then add this file into firewalld
```python
firewall-cmd --zone=public --add-service=mongod
firewall-cmd --zone=public --add-service=node_server
```

* create user in mongo
```python 
> use admin;
> db.createUser({
      user: "admin",
      pwd: "myadminpassword",
      roles: [
                { role: "userAdminAnyDatabase", db: "admin" },
                { role: "readWriteAnyDatabase", db: "admin" },
                { role: "dbAdminAnyDatabase",   db: "admin" }
             ]
  });
```
* login from a client
```python
mongo -u admin -p myadminpassword 171.244.39.13/admin
```
* connection string db
```python 
mongodb://admin:myadminpassword@171.244.39.13:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
```

* How to configure .env at server
1. npm install dotenv
2. Create .env with the below content:
### At server
  NODE_ENV=development
  PORT=3000
  SSL_KEY="/etc/apache2/certificate/awinst.com/awinst.com.key"
  SSL_CRT="/etc/apache2/certificate/awinst.com/awinst.com.crt"

### At local debug:
.env
  NODE_ENV=development
  PORT=3000
  SSL_KEY="./cert/localhost.key"
  SSL_CRT="./cert/localhost.crt"
