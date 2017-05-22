const express = require('express');
const router = express.Router();

const utils = require('../ctrl/utils');
const auth = new utils().auth('smtp');

const nodemailer = require('nodemailer');

const config = {
    host: 'plesk.cubis-helios.com',
    port: 465,
    secure: true,
    auth: {
        user: auth.user,
        pass: auth.pass
    },
    tls: {
        rejectUnauthorized: false
    }
};

const transporter = nodemailer.createTransport(config);

router.post('/', function(req, res) {

    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
            render(res, 'Votre message n\'a pas été envoyé', false);
        }
    });

    transporter.sendMail({
        from: '"' + req.body.name + '" <' + req.body.email + '>',
        to: 'a.soyer@outlook.com',
        subject: req.body.subject,
        text: req.body.message
    }, (error, info) => {
        if (error) {
            console.log(error);
            render(res, 'Votre message n\'a pas été envoyé', false);
        }
        // console.log('Message %s sent: %s', info.messageId, info.response);
    });

    render(res, 'Votre message a bien été envoyé');
});

function render(res, message, sucess = true) {

    res.render('contact', {
        message: message,
        messageDisplay: true,
        messageType: sucess ? 'success' : 'error'
    });

}

module.exports = router;