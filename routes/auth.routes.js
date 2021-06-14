const { Router } = require('express');
const { check } = require('express-validator');
const {
    checkFields,
    checkUserLogin,
    checkEmailDb
} = require('../middlewares/fields-validator');
const {
    login
} = require('../controllers/auth.controller');

const router = new Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('email').custom((email, { req }) => checkUserLogin(email, req.body.password)),
    checkFields
], login)

module.exports = router;