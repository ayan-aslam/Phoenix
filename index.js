// We are importing the express module.
// Node identifies commonjs module that's why we can't use import.

const express = require('express');
const authRoutes = require('./routes/authRoutes');  
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');

//Order of require statements matters.
require('./models/User.js');
require('./services/passport');
const dbURI = process.env.DB_CONNECT;



const mongoose = require('mongoose');
// Importing the mongoose module to connect to MongoDB.

mongoose.connect(keys.mongoURI);






// This is creating a simple express server that listens on port 5000
// and responds with a JSON object when the root URL is accessed.
// It uses the 'express' module to create the server and handle requests.

const app = express();

// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000, // 24 hours in milliseconds
//         keys: [keys.cookieKey] // Use the cookie key from the config
//     })
// );

                app.use(
                    session({
                        secret: keys.cookieKey,
                        resave: false,
                        saveUninitialized: false,
                        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
                    })
                );


app.use(passport.initialize());
app.use(passport.session());


//Imported route handlers from authRoutes.js exported as aa function.
authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);