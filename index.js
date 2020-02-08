'use strict';

require('dotenv').config();

const server = require('./src/app.js')

const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
mongoose.connect('MONGODB_URI=mongodb://localhost:27017/class11auth', options);

server.start(process.env.PORT);