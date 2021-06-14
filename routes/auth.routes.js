const { Router } = require('express');
const { check } = require('express-validator');
const {
    checkFields,
    checkUserLogin
} = require('../middlewares/fields-validator');
const {
    login,
    googleSignin
} = require('../controllers/auth.controller');

const router = new Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('email').custom((email, { req }) => checkUserLogin(email, req.body.password)),
    checkFields
], login)

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    checkFields
], googleSignin)

module.exports = router;