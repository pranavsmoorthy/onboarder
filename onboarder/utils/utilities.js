const _ = require('lodash');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dummyuser172@gmail.com',
        pass: 'dzoz zmtp gufe dabr'
    }
})

function sendEmail(reciever, subject, html){
    const mailOptions = {
        from: 'noreply@gmail.com',
        to: reciever,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function isEmptyOrNil(value) {
    return _.isNil(value) || _.isEmpty(value);
}

module.exports = {
    sendEmail,
    isEmptyOrNil
}