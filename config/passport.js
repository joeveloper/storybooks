// Description: This file contains the configuration of the passport.js. 
// Passport.js is a middleware used to authenticate requests. It is used to authenticate users using a username and password, Facebook, Twitter, and more.
// The passport.js file is used to configure the passport middleware. The passport middleware is used to authenticate requests.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        // const newUser = {
        //     googleId: profile.id,
        //     displayName: profile.displayName,
        //     firstName: profile.name.givenName,
        //     lastName: profile.name.familyName,
        //     image: profile.photos[0].value
        // }

        // try {
        //     let user = await User.findOne({ googleId: profile.id });

        //     if (user) {
        //         done(null, user);
        //     } else {
        //         user = await User.create(newUser);
        //         done(null, user);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}