
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config/app");
const User = require("../database/models/user");
/**
 * @description to register a new user()
 */

const userRegister = async (userDets, role, res) => {
    try {
        console.log("xxxx", userDets);
        // validate the user
        // let usernameNotTaken = await validateUsername(userDets.username);
        // if (!usernameNotTaken) {
        //     return res.status(400).json({
        //         message: `The username is already taken.`,
        //         success: false
        //     });
        // }
        // validate the email
        let emailRegistered = await validateEmail(userDets.email);
        if (!emailRegistered) {
            return res.status(400).json({
                message: `The email is already taken.`,
                success: false
            });
        }

        // get the hashed password
        const password = await bcrypt.hash(userDets.password, 12);
        // create a new user
        const newUser =  new User({ 
            email: userDets.email,
            password: password,
            role: role
        });
        await newUser.save();
        return res.status(200).json({
            message: "Successfully registered!",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create your account. " + err,
            success: false
        });
    }
};

/**
 * 
 * @description login function
 */
const userLogin = async (userCreds, role, res) => {
    let { email, password } = userCreds;
    // first check if the email exits in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "The username is not found. Invalid login credentials.",
            success: false
        });
    }
    // check the role
    if (user.role !== role) {
        return res.status(403).json({
            message: "Please make sure you are logging in from the right portal.",
            success: false
        });
    }
    // That means user is existing and trying to signin fro the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // Sign in the token and issue it to the user
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role,
                email: user.email
            },
            SECRET,
            { expiresIn: "7 days" }
        );

        let result = {
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: "You are now logged in.",
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
            success: false
        });
    }
};

//-----
const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};
/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

/**
 * Passport
 */
const userAuth = passport.authenticate("jwt", { session: false});

const serializeUser = user => {
    return {
    //   username: user.username,
      email: user.email,
    //   name: user.name,
      _id: user._id,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
  };

module.exports = {
    checkRole,
    userAuth,
    userLogin,
    userRegister,
    serializeUser
};