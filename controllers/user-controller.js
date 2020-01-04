const crypto = require('crypto');

const orderDatastore = require('../datastores/order-datastore');

const userDatastore = require('../datastores/user-datastore');
const userModel = require('../models/user');

const cartDatastore = require('../datastores/cart-datastore');
const cartModel = require('../models/cart');

module.exports = {
    /**
     * Serve the profile page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    profilePage: async function(req, res) {
        // Check if user is logged in or not.
        let userId = req.session.userId;
        if (userId) {
            // Retrieve user information.
            let user = await userDatastore.find(userId);
            
            // Calculate total points earned.
            let orders = await orderDatastore.findByUserId(userId);
            let totalPoints = 0;
            for (const order of orders) {
                for (const orderDetail of order.orderDetails) {
                    // Points times quantity.
                    totalPoints += orderDetail.product.pointsObtainable * orderDetail.quantity;
                }
            }

            res.render('profile', {
                user: user,
                pointsEarned: totalPoints
            });
        } else {
            // User must be logged in before allowing access to his profile page.
            // Redirect user to the login page.
            req.session.loginRedirect = '/profile';
            res.redirect('/login');
        }
    },

    /**
     * Serve the login page to client.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    loginPage: async function (req, res) {
        res.render('login');
    },

    /**
     * Perform login.
     * 
     * @param {Express.Request} req - The request object.
     * @param {Express.Response} res - The response object.
     */
    login: async function (req, res) {
        // Get the username/email from the form.
        let identification = req.body.identification;
        // Get the password from the form and hash it to match database hashing algorithm
        let password = crypto.createHash('sha256').update(req.body.pw.toString()).digest('base64');

        // Perform validation
        let errors = validateLogin(req, res);
        if (errors) {
            req.flash('error', errors);
            res.render('login', {
                identification: identification
            })
        } else {
            // Attempt to get results by checking for email first. If there is no results, then attempt to get results by username.
            let user = await userDatastore.findByEmail(identification) || await userDatastore.findByUsername(identification);

            // Enter this block if user is found.
            if (user) {
                // Check if password matches. If so, allow user to enter.
                if (user.password == password) {
                    // User is authenticated.
                    // Store user id in session
                    req.session.userId = user._id;

                    // Check if user has cart in session.
                    let sessionCart = req.session.cart;
                    if (sessionCart) {
                        // Transfer the cart in session to database.
                        for (const element of sessionCart) {
                            let cart = new cartModel({
                                user: user._id,
                                product: element.productId,
                                quantity: element.quantity
                            });

                            await cartDatastore.add(cart);
                        }
                    }

                    // Pass a redirect here so that user won't resent form again if he clicks 'Back' on his browser.
                    // Check if user was sent to login from other pages.
                    let loginRedirect = req.session.loginRedirect;
                    if (loginRedirect) {
                        // Clear value from session.
                        req.session.loginRedirect = undefined;
                        // Redirect him to where he came from.
                        return res.redirect(loginRedirect);
                    } else {
                        // Redirect him to index.
                        return res.redirect('/index');
                    }
                }
            }

            // User not found; do nothing more.
            // Inform client that identification and/or password is invalid.
            req.flash('error', 'Invalid login! Please check your username/email and password.');
            res.render('login', {
                // Pass whatever user typed back to the form, so he doesn't have to retype again.
                identification: identification
                // By convention, password isn't sent back since the user is unable to see the password in plain text. This means he will end up retyping the password again.
                // password: password
            });
        }
    },

    /**
     * Serve the register page to the client.
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    registerPage: async function (req, res) {
        res.render('register');
    },

    /**
     * Perform registration. This will add a new user account to the database.
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    register: async function (req, res) {
        // Get the form data.
        let fullname = req.body.name;
        let email = req.body.email;
        let address = req.body.address;
        let mobile = req.body.mobileNo;
        let username = req.body.username;
        let password = req.body.pw;

        // Perform validation
        let errors = validateRegister(req, res);
        if (errors) {
            console.log(errors);
            
            req.flash('error', errors);
            res.render('register', {
                fullname: fullname,
                email: email,
                address: address,
                mobile: mobile,
                username: username
            });
        } else {
            // Create a new user.
            let user = new userModel({
                fullname: fullname,
                email: email,
                address: address,
                mobile: mobile,
                username: username,
                password: password
            });

            // Let datastore perform the adding of user.
            await userDatastore.add(user);

            // Redirect client to login.
            req.flash('success', 'Registration success! Please login with your username/email and password.');
            res.redirect('/login');
        }
    }
}

/**
 * Validate login form.
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function validateLogin(req, res) {
    let identification = req.body.identification;
    let password = req.body.pw;

    // Define an array of errors.
    let errors = [];

    // Check if any of the data is empty or missing.
    if (!identification) {
        errors.push('Username/Email Address must not be empty!');
    }

    if (!password) {
        errors.push('Password must not be empty!');
    }

    return errors.length > 0 ? errors : null;
}

/**
 * Validate register form.
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function validateRegister(req, res) {
    let fullname = req.body.name;
    let email = req.body.email;
    let address = req.body.address;
    let mobile = req.body.mobileNo;
    let username = req.body.username;
    let password = req.body.pw;
    let confirmPassword = req.body.cfpw;

    // Define an array of errors.
    let errors = [];

    if (!fullname) {
        errors.push('Full Name must not be empty!');
    }

    if (!email) {
        errors.push('Email Address must not be empty!');
    } else {
        // Regex for testing email format (must contain one @ and one fullstop; abc@mail.com).
        let regex = /^\S+@\S+\.\S+$/;
        
        if (!regex.test(email)) {
            errors.push('Email must be of a valid format! For example: abc@mail.com');
        }
    }

    if (!address) {
        errors.push('Address must not be empty!');
    }

    if (!mobile) {
        errors.push('Mobile Number must not be empty!');
    } else {
        if (mobile.length != 8) {
            errors.push('Mobile Number must be 8 digit long!');
        }

        // Regex for testing if value consists of only integers.
        let regex = /^\d+$/;
        if (!regex.test(mobile)) {
            errors.push('Mobile Number must consists of only whole numbers!');
        }
    }

    if (!username) {
        errors.push('Username must not be empty!');
    }

    if (!password) {
        errors.push('Password must not be empty!');
    } else if (confirmPassword != password) {
        errors.push('Confirm Password must match Password!');
    }

    return errors.length > 0 ? errors : null;
}