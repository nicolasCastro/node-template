const { Router } = require('express');
const {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
} = require('../controllers/users.controller')

const router = new Router();

router.get('/', getUsers)
router.post('/', postUsers)
router.put('/:id', putUsers)
router.patch('/', patchUsers)
router.delete('/', deleteUsers)



module.exports = router;