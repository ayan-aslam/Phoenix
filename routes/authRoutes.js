const passport = require('passport');

//Exporting the route handlers, to our mian index file.

module.exports = (app) => {
    //Oauth Route Handler 
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    //The Redirection Route Handler, After getting the OAuth code.

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/surveys'); // Redirect to the home page or any other page you want
        }
        
    );

    app.get('/api/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });    
}
