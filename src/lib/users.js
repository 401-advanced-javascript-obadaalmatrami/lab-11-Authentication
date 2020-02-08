'use strict';



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const users = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String }
});

users.pre('save', function(next) {
    return bcrypt.hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(error => { throw error; });
});




users.statics.authenticateBasic = function(auth) {
    let query = { username: auth.username };
    return this.findOne(query)
        .then(user => user && user.comparePassword(auth.password))
        .catch(console.error);
};




users.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
        .then(isPasswordValid => {
            return isPasswordValid ? this : null;
        });
};



users.methods.generateToken = function() {
    let tokenData = {
        id: this._id,
        capabilities: (this.acl && this.acl.capabilities) || [],
    };
    return jsonWebToken.sign(tokenData, process.env.SECRET || 'mysecretis');
};

module.exports = mongoose.model('users', users);