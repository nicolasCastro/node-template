const { Router } = require('express');
const { check } = require('express-validator');
const {
    checkFields,
    checkRole,
    checkEmailDb
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
router.put('/:id', putUsers)
router.patch('/', patchUsers)
router.delete('/', deleteUsers)



module.exports = router;