const helper = require('./utils/test_helper');
const app = require('../src/app');
const api = require('supertest')(app);

describe('Adding a user', () => {
    describe('invalid email returns status code 400 with message', () => {
        test('no email returns', async () => {
            const user = {
                email: undefined,
                username: 'username',
                password: 'asswordpassord'
            }
    
            const { message } = await 
                helper.register(api, user, 400);
    
            expect(message).toMatch('you need an email');
        });

        test('bad email returns', async () => {
            const user = {
                email: 'bademail.cmo',
                username: 'username',
                password: 'asswordpassord'
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('email invalid');
        });
    });

    describe('invalid username returns status code 400 with message', () => {
        test('no username returns', async () => {
            const user = {
                email: 'email@test.com',
                username: undefined,
                password: 'asswordpassord'
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('you need a username');
        });

        test('short username returns', async () => {
            const user = {
                email: 'email@test.com',
                username: 'a',
                password: 'asswordpassord'
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('username too short');
        });

        test('loong username returns', async () => {
            const user = {
                email: 'email@test.com',
                username: 'ausernamethatissolongthatithurts',
                password: 'asswordpassord'
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('username too long');
        });
    });

    describe('invalid password returns status 400', () => {
        test('no password returns', async () => {
            const user = {
                email: 'email@test.com',
                username: 'username',
                password: undefined
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('you need a password');
        });

        test('short password returns', async () => {
            const user = {
                email: 'email@test.com',
                username: 'username',
                password: 'ass'
            }
    
            const { message } = await
                helper.register(api, user, 400);
    
            expect(message).toMatch('password to short');
        });
    });

    /*test('returns 400 if email isn`t in unique');
    
    test('returns 400 if username ins`t unique');*/

    describe('adding user', () => {
        test('returns token', async () => {
            const user = {
                email: 'email@test.com',
                username: 'username',
                password: 'asspassword'
            }

            const response = await 
                helper.register(api, user, 201);
            
            expect(response.token).toBeDefined();
        });
    });
});