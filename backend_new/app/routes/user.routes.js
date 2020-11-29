// Authorization:

// GET /api/test/all
// GET /api/test/user for loggedin users (user/moderator/admin)
// GET /api/test/mod for moderator
// GET /api/test/admin for admin

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/salon_owner",
        [authJwt.verifyToken, authJwt.isSalonOwner],
        controller.salonOwnerBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/distributor",
        [authJwt.verifyToken, authJwt.isDistributor],
        controller.distributorBoard
    );
};