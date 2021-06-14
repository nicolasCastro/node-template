const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uid }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '24h' // expiration of the token - 24 hrs
        }, (error, token) => {
            if (error) reject(error)
            else resolve(token);
        })
    });
}

const checkJWT = async (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(403).json({ msg: 'Invalid token' });
        const { uid, exp } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const user = await getUserById(uid);

        const expired = new Date().setTime(exp * 1000) < new Date();

        if (!user ||
            !user.status ||
            expired) return res.status(403).json({ msg: 'Invalid token' });

        req.user = user;

        next();
    } catch (error) {
        res.status(403).json({ msg: 'Invalid token' });
    }
}

const getUserById = async (id = '') => {
    // get the user by id
    return await User.findById(id);
}

const getUserByEmail = async (email = '') => {
    // get the user by email
    return await User.findOne({ email });
}


module.exports = {
    createJWT,
    checkJWT,
    getUserById,
    getUserByEmail
}