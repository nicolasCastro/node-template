const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { createJWT, getUserByEmail } = require('../middlewares/utils');
const { checkGoogleToken } = require('../middlewares/google-validator');

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

const googleSignin = async (req = request, res = response) => {

    const idToken = req.body.id_token;

    try {
        const { name, email, img } = await checkGoogleToken(idToken);

        let user = await getUserByEmail(email);

        if (!user) {
            const data = {
                name,
                email,
                password: ' ',
                img,
                google: true
            }
            user = new User(data);
            await user.save();
        } else if (!user.status) {
            res.status(400).json({
                msg: 'User has been deactivated'            
            })
        }

        const token = await createJWT(user.id);

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    login,
    googleSignin
}