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
        passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });    

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });    
}