
const { verifySignUp } = require("../middlewares");
const becomeSalonOwnerController = require("../controllers/becomeSalonOwner.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // TODO- check roles here later
    app.post("/api/salon-owner/new-obj", [authJwt.verifyToken], becomeSalonOwnerController.createObj);

    
};
