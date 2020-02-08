'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const basicAuth = require('../src/lib/basic-auth-middleware.js');
const users = require('../src/lib/users.js');

const server = express();

server.use(cors());
server.use(morgan('dev'));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(basicAuth);


server.post('/signup', (req, res) => {
    try {
        users.save(req.body)
            .then(user => {
                let token = users.generateToken(user);
                res.status(200).send(token);
            });

    } catch (error) {

        next(`ERROR: ${e.message}`);
    }

});

server.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.token);
});

server.get('/users', basicAuth, (req, res) => {
    res.status(200).json(users.list());
});


module.exports = {
    server: server,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`SERVER IS LISTEN ON PORT ${PORT}`));
    },
};