// Controller for sending email

const { user } = require('../models');
const db = require("../models");
const User = db.user;
const Role = db.role;
var express = require('express');
var messageRouter = express.Router();
const crypto = require("crypto");
const config = require("../config/auth.config");
/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

messageRouter.post('/activate', (req, res) => {

    console.log(req.body);
    
    var toEmail = req.body.email;
    var fromEmail = 'katokvietnam@gmail.com';
    var subject = 'Xác thực tài khoản đăng ký';
    var text = 'Chúc mừng bạn đã trở thành một thành viên của Katok Vietnam. Xin vui lòng xác nhận email của bạn để hoàn thành việc đăng ký.';
    
    var verifyHref = 'https://localhost:3000/email/verification/sm234234kjh';
    var htmlContent = '<div>' + text + '</div>' + '<div style="background:#00b2e9;width:242px;text-align:center;margin:0 auto;border-radius:50px;vertical-align:middle;padding:10px 0 10px 0">\
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
            console.log('Email sent');
            res.send(result);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        })
});
*/

messageRouter.get('/verification/:username/:encryptedData', (req, res) => {
    console.log(req.params);
    User.findOne({
        username: req.params.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            const algorithm = "aes-256-cbc"; 
            const decipher  = crypto.createDecipheriv(algorithm, config.AES256_SECURITY_KEY, config.AES256_INIT_VECTOR);

            var decryptedData = decipher.update(req.params.encryptedData, "hex", "utf-8");
            decryptedData += decipher.final("utf8");

            //console.log(decryptedData);
            if(decryptedData != user.username){
                return res.status(404).send({ message: "Verification is invalid !!!" });
            }

            User.findOneAndUpdate({ username: req.params.username}, 
            {$set: 
                { 
                    isActivated : true,                    
                },
            },
            { new: true })
            .then(user => {
                //console.log(user);
                res.send("Xác nhận email thành công.");
            })
            .catch((error) => {
                console.log(error);
                res.send(error);
            });
        })        
});

module.exports = messageRouter;