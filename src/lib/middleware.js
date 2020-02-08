'use strict';


const User = require('../lib/users.js');

module.exports = (req, res, next) => {

    try {

        let [authType, encodedString] = req.headers.authorization.split(/\s+/);


        switch (authType.toLowerCase()) {
            case 'basic':
                return _authBasic(encodedString);
            default:
                return _authError();
        }

    } catch (e) {
        return _authError();
    }




    function _authBasic(authString) {
        let base64Buffer = Buffer.from(authString, 'base64');
        let bufferString = base64Buffer.toString();
        let [username, password] = bufferString.split(':');
        console.log([username, password]);
        let auth = { username, password };

        return User.authenticateBasic(auth)
            .then(user => _authenticate(user));
    }


    function _authenticate(user) {
        if (user) {
            req.user = user;
            req.token = user.generateToken();
            next();
        } else {
            _authError();
        }
    }

    function _authError() {
        next({ status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password' });
    }
}