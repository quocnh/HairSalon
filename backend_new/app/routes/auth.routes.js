// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will response by setting up the routes.

// We can separate our routes into 2 parts: for Authentication and for Authorization (accessing protected resources).

// Authentication:

// POST /api/auth/signup
// POST /api/auth/signin

const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
            verifySignUp.sendVerificationEmail
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);
    app.post("/api/auth/changePassword", authController.changePassword);

    
};
