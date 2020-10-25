
/*jshint esversion: 6 */
const UserOwner = require('../database/models/user.js');


var express = require('express');
var UserRouter = express.Router();

// user registration route
UserRouter.post("/register-customer",async (req, res) => {
   
});
// salon owner registration route
UserRouter.post("/register-salonOwner",async (req, res) => {
   
});
// admin registration route
UserRouter.post("/register-admin",async (req, res) => {
   
});
// user login route
UserRouter.post("/login-customer",async (req, res) => {
   
});
// salon owner login route
UserRouter.post("/login-salonOwner",async (req, res) => {
   
});
// admin login route
UserRouter.post("/login-admin",async (req, res) => {
   
});
// user protected route
UserRouter.post("/customer-profile",async (req, res) => {
   
});
// salon owner protected route
UserRouter.post("/salonOwner-profile",async (req, res) => {
   
});
// admin protected route
UserRouter.post("/admin-profile",async (req, res) => {
   
});
module.exports = UserRouter;