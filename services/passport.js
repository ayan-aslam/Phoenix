// Now we import passport for Google OAuth.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//Importing OAuth keys

// console.log('Loaded keys:', keys); // Add this line to debug

const keys = require('../config/keys');
const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    // This function is called when we need to retrieve the user from the database.
    // It takes the user ID and calls done with the user object.
    User.findById(id).then((user) => {
        done(null, user);
    });
});


// This takes use of the GoogleStrategy Object and creates a new instance using the new keyword 
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            proxy : true
        },    
        async (accessToken, refreshToken, profile, done) => {
                    //console.log('Access Token: ', accessToken); // Add this line to debug
                    //console.log('Refresh Token: ', refreshToken); // Add this line to debug
                    //console.log('Profile: ', profile); // Add this line to debug




            // This callback function is called after the user has been authenticated by Google.
            // The profile object contains information about the user.
            // We can use this information to create a new user in our database.

                    // console.log('Profile:', profile); // Add this line to debug

            // Check if the user already exists in the database
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser){
                done(null, existingUser)
            }
            else{
                const user = await new User({ googleId: profile.id }).save()
                done(null, user);
            }
        }
    )
);    


// The object takes two argument objects: first the authorization keys object containing ID, Secret and callback URL.
// and second is the callback function that redirects the user to where we want the redirection.


