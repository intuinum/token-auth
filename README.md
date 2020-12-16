# Authentication

## Prerequisite's

This project uses mongo and mongoose to store user information. In order for the project to function, add a mongodb URI to the .env filed.
    DB_URI=your-mongodb-URI-here
The project also needs a PORT and SECRET variable
    PORT=3000
    SECRET=your-token-secret-here

## Scripts

To start the project in development mode:
    yarn run dev
    npm run dev

To run project tests:
    yarn run test
    npm run test

To start the project in production mode:
    yarn start
    npm start

## The API

The API can register new users and login returning users.

To Register a new user POST to the 
    /api/users/register
endpoint with a username, email and password

To login in a existing user POST to the
    /api/users/login
endpoint with a username and password

Both endpoints will return a token if the data, i.e. username etc., is valid.

If data is invalid the API will respond with 400 status codes and messages on what went wrong.