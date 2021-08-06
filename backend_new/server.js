const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const { success, error } = require("consola");

const app = express();
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

var key = fs.readFileSync(`${process.env.SSL_KEY}`);
var cert = fs.readFileSync(`${process.env.SSL_CRT}`);
var options = {
  key: key,
  cert: cert
};

app.use(bodyParser.urlencoded({
    limit: '1mb',
    extended: false
  }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
//mongodb://admin:myadminpassword@171.244.39.13:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
db.mongoose
    .connect(`mongodb://${dbConfig.MG_USERNAME}:${dbConfig.MG_PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to HaizSalon application." });
});

// set port, listen for requests
console.log(`Your port is configured in .env ${process.env.PORT}`);
const PORT = process.env.PORT || 3000;

var server = https.createServer(options, app);

server.listen(PORT, '0.0.0.0', () => {
  console.log("server starting on port : " + PORT)
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

// initial() function helps us to create 4 important rows in roles collection at the first run.
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
            new Role({
                name: "salon_owner"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'salon_owner' to roles collection");
            });

            new Role({
                name: "distributor"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'distributor' to roles collection");
            });


        }
    });
}

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/becomeSalonOwner.routes")(app);
require("./app/routes/becomeDistributor.routes")(app);