'use strict';

process.env.STORAGE = 'mongo';

const jwt = require('jsonwebtoken');

const server = require('../../src/app.js').server;
const supergoose = require('../__tests__/supergoose.js');


let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {

    Object.keys(users).forEach(userType => {

        describe(`${userType} users`, () => {


            it('can create one', () => {

            });

            it('can signin with basic', () => {

            });

        });

    });

});