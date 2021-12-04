const { Router } = require('express');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth')

const router = Router();

// Route for SignUp

/**
 * @swagger
 * /signup:
 *  post:
 *    tags: ['auth']
 *    description: signup a new user
 *    responses:
 *      '201':
 *        description: A successful response
 *      '400' :
 *        description: Error occured
 */
router.post('/signup' ,authController.post_signup);

//Routes for login

/**
 * @swagger
 * /login:
 *  post:
 *    tags: ['auth']
 *    description: login the user
 *    responses:
 *      '201':
 *        description: A successful response
 *      '400' :
 *        description: Error occured
 */
router.post('/login',authController.post_login);

//Route for logout
router.get('/logout', auth, authController.get_logout);

module.exports = router;