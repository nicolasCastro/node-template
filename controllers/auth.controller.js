const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { createJWT, getUserByEmail } = require('../middlewares/utils');

const login = async (req = request, res = response) => {

    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);
        const token = await createJWT(user.id);
        // send the result
        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Somthing went wrong'
        })
    }

}

module.exports = {
    login
}