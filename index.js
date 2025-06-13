// We are importing the express module.
// Node identifies commonjs module that's why we can't use import.

const express = require('express');
const authRoutes = require('./routes/authRoutes');  
const keys = require('./config/keys');
const passport = require('passport');
const billingRoutes = require('./routes/billingRoutes');
const cookieSession = require('cookie-session');
const session = require('express-session');
const bodyParser = require('body-parser');

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

app.use(bodyParser.json()); // Middleware to parse JSON request bodies  


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
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



const PORT = process.env.PORT || 5000;

app.listen(PORT);