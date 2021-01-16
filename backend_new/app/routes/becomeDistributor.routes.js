
const { verifySignUp } = require("../middlewares");
const becomeDistributorController = require("../controllers/becomeDistributor.controller");
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
    app.post("/api/become-distributor/newObj", [authJwt.verifyToken], becomeDistributorController.createObj);
    app.patch("/api/become-distributor/accept", [authJwt.verifyToken], becomeDistributorController.accept);
    app.patch("/api/become-distributor/reject", [authJwt.verifyToken], becomeDistributorController.reject);
    app.get(
        "/api/become-distributor/getAll",
        [authJwt.verifyToken, authJwt.isAdmin],
        becomeDistributorController.getAllBecomeDistributorRequest
    );
    
};
