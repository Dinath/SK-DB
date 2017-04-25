function Authentification() {
    console.log('construct');
}

const auth_key = 'pass';

/**
 * 
 * @param {*} token_received 
 */
Authentification.prototype.auth = function(token_received) {

    console.log(token_received);

    if (token_received === auth_key) {
        return true;
    } else {
        return false;
    }
};

module.exports = Authentification;