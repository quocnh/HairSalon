const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
/**
 * @description to register a new user()
 */

 const userRegister = async (userDets, role, res) =>{
    try {
        console.log("xxxx", userDets);
        // validate the user
        let usernameNotTaken = await validateUsername(userDets.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: `The username is already taken.`,
                success: false
            });
        }
        // validate the email
        let emailRegistered = await validateEmail(userDets.email);
        if (!emailRegistered) {
            return res.status(400).json({
                message: `The email is already taken.`,
                success: false
            });
        }
        
        // get the hashed password
        const password = await bcrypt.hash(userDets.password,12);
        // create a new user
        const newUser = new User({
            ...userDets,
            password,
            role
        });
        await newUser.save();
        return res.status(201).json({
            message: "Successfyly registered!",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create your account.",
            success: false
        });
    }
 };

 const validateUsername = async username => {
    let user = await User.findOne({username});
    return user ? false : true;
 };

 const validateEmail = async email => {
    let user = await User.findOne({email});
    return user ? false : true;
 };

 module.exports = {
    userRegister
 };