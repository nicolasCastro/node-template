const { Router } = require('express');
const { check } = require('express-validator');
const { checkJWT } = require('../middlewares/utils');
const {
    checkFields,
    checkRole,
    checkEmailDb,
    checkUserById
} = require('../middlewares/fields-validator');
const {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
} = require('../controllers/users.controller')

const router = new Router();

router.get('/', getUsers)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(checkEmailDb),
    check('role').custom(checkRole),
    checkFields
], postUsers)

router.put('/:id', [
    check('id', 'User doesn\'t exist').isMongoId(),
    check('id').custom(checkUserById),
    checkFields
], putUsers)

router.delete('/:id', [
    checkJWT,
    checkFields
], deleteUsers)

module.exports = router;