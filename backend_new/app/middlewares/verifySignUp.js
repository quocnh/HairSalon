// To verify a Signup action, we need 2 functions:
// – check duplications for username and email
// – check if roles in the request is legal or not
const config = require("../config/auth.config");
const dbconfig = require("../config/db.config");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const crypto = require("crypto");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

// – check duplications for username and email
checkDuplicateUsernameOrEmail = (req, res, next) => {

    console.log("XXX signup request: ", req.body)
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      console.log('username error: ' + err);
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        console.log('email error: ' + err);
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

// – check if roles in the request is legal or not
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

// Send Email verification
sendVerificationEmail = (req, res, next) => {
  if (req.body.email == null) {
    res.status(400).send({
      message: `Please insert correct email address !!!`
    });
    return;
  }

  console.log(req.body.email);
  var username = req.body.username;
  const algorithm = "aes-256-cbc"; 
  const cipher = crypto.createCipheriv(algorithm, config.AES256_SECURITY_KEY, config.AES256_INIT_VECTOR);
  //const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  var encryptedData  = cipher.update(username, "utf-8", "hex");
  encryptedData  += cipher.final("hex");
  var toEmail = req.body.email;
  var fromEmail = 'katokvietnam@gmail.com';
  var subject = '[Katok] Xác thực tài khoản đăng ký';
  var text = 'Chúc mừng bạn đã trở thành một thành viên của Katok Vietnam. Xin vui lòng xác nhận email của bạn để hoàn thành việc đăng ký.';
  
  var verifyHref = dbconfig.WEB_HOST + '/home/email/verification/' + username + '/' + encryptedData ;
  var htmlContent = '<div class="row">' + text + '</div>' + '<div style="background:#00b2e9;width:242px;text-align:center;margin:0 auto;border-radius:50px;vertical-align:middle;padding:10px 0 10px 0">\
  <a href=' + verifyHref+ '\
  style="color:#fff;text-decoration:none;font-size:16px">\
      Xác nhận email của bạn \
  </a></div>'

  var msg = {
      to: toEmail,
      from: fromEmail,
      subject: subject,
      text: text,
      html: htmlContent,
    }

  sgMail
      .send(msg)
      .then((result) => {
          console.log('Verification Email sent');
          //res.send(result);
      })
      .catch((error) => {
          console.error(error);
          //res.send(error);
      })
  next();
};

// Send Email ForgetPassword
sendForgetPasswordEmail = (req, res, next) => {
  if (req.body.email == null) {
    res.status(400).send({
      message: `Please insert correct email address !!!`
    });
    return;
  }

  console.log(req.body.email);
  var username = req.body.username;
  const algorithm = "aes-256-cbc"; 
  const cipher = crypto.createCipheriv(algorithm, config.AES256_SECURITY_KEY, config.AES256_INIT_VECTOR);
  //const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  var encryptedData  = cipher.update(username, "utf-8", "hex");
  encryptedData  += cipher.final("hex");
  var toEmail = req.body.email;
  var fromEmail = 'katokvietnam@gmail.com';
  var subject = '[Katok] Thay đổi mật khẩu';
  var text = 'Xin vui lòng click vao link bên dưới để thay đổi mật khẩu cho '+ username;
  
  var verifyHref = dbconfig.WEB_HOST + '/home/email/forget/' + username + '/' + encryptedData ;
  var htmlContent = '<div class="row"> <p>' + text + '</p></div>' + '<div class="row"> <p></p></div> <div style="background:#00b2e9;width:242px;text-align:center;margin:0 auto;border-radius:50px;vertical-align:middle;padding:10px 0 10px 0">\
  <a href=' + verifyHref+ '\
  style="color:#fff;text-decoration:none;font-size:16px">\
      Thay đổi mật khẩu \
  </a></div>'

  var msg = {
      to: toEmail,
      from: fromEmail,
      subject: subject,
      text: text,
      html: htmlContent,
    }

  sgMail
      .send(msg)
      .then((result) => {
          console.log('ForgetPassword Email sent');
          //res.send(result);
      })
      .catch((error) => {
          console.error(error);
          //res.send(error);
      })
  next();
};

checkMatchUsernameOrEmail = (req, res, next) => {

  console.log("XXX forget password request: ", req.body)
  // Username
  User.findOne({
    username: req.body.username,
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      console.log('username/email error: ' + err);
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {      
      res.status(400).send({ message: "Failed! Username is not registered yet!" });
      return;
    }    
  });
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  sendVerificationEmail,
  checkMatchUsernameOrEmail,
  sendForgetPasswordEmail
};

module.exports = verifySignUp;