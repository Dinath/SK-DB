var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

const config = {
    host: 'plesk.cubis-helios.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'a.soyer@cubis-helios.com',
        pass: 'pass'
    },
    tls: {
        rejectUnauthorized: false
    }
};

let transporter = nodemailer.createTransport(config);

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
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    render(res, 'Votre message a bien été envoyé');
});

function render(res, message, sucess = true) {

    res.render('contact', {
        message: message,
        messageType: sucess ? 'success' : 'error'
    });

}

module.exports = router;