const express = require('express');
const router = express.Router();
const user = require('../db/index').user;

const Log = require('express-fail2ban/log');


router.get('/', function(req, res) {
    res.render('auth');
});

/**
 * 
 */
router.post('/', function(req, res) {

    /**
     * User wants to disconnect
     */

    if (req.body.disconnect) {
        req.session.user = undefined;
        res.redirect('/');
        return;
    }

    /**
     * Check for credentials
     */

    user.findOne({
        raw: true,
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then(function(user) {
        if (user) {
            req.session.user = user;
            res.redirect('/auth');
        } else {

            Log.auth_failed(req.ip, req.body.email);

            res.render('auth', {
                message: 'Authentification incorrecte',
                messageDisplay: true,
                messageType: 'error'
            });
        }
    });
});


module.exports = router;