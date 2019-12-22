const userDatastore = require('../datastores/user-datastore');

module.exports = {
    /**
     * Serve the login page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    loginPage: async function(req, res) {
        res.render('login');
    },

    /**
     * Perform login.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    login: async function(req, res) {
        // Get the username/email from the form.
        let identification = req.body.identification;
        // Get the password from the form.
        let password = req.body.password;

        // Attempt to get results by checking for email first. If there is no results, then attempt to get results by username.
        let user = await userDatastore.findByEmail(identification) || await userDatastore.findByUsername(identification);

        // Enter this block if user is found.
        if (user) {
            // Check if password matches. If so, allow user to enter.
            if (user.password == password) {
                // Pass a redirect here so that user won't resent form again if he clicks 'Back' on his browser.
                res.redirect('/user');
                return;
            }
        }

        // User not found; do nothing more.
        res.render('login', {
            // Pass whatever user typed back to the form, so he doesn't have to retype again.
            identification: identification, 
            // By convention, password isn't sent back since the user is unable to see the password in plain text. This means he will end up retyping the password again.
            // password: password
        });
    }
}