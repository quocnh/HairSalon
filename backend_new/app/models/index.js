
// define all models here

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.customer = require("./customer.model");

db.ROLES = ["user", "admin", "salon_owner", "distributor"];

module.exports = db;