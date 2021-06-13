const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = async (req = request, res = response) => {

    const { limit = 5, offset = 5 } = req.query;

    await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip(Number(offset))
            .limit(Number(limit))
    ]).then(([total, users]) => {
        res.status(200).json({
            total,
            users
        })
    });
}

const postUsers = async (req = request, res = response) => {
    // params from the raw json body
    const { name, email, password, role } = req.body;
    const user = User({ name, email, password, role });

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // save the user to DB
    await user.save();

    // send the result
    res.status(200).json({
        user
    })
}

const putUsers = async (req = request, res = response) => {

    // get param from the url /users/:id
    const { id } = req.params;
    const { _id, google, password, email, role, ...user } = req.body;

    const result = await User.findByIdAndUpdate(id, user, { new: true });
    console.log(result);
    res.status(200).json({
        result
    })
}

const patchUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: 'patch api - controller'
    })
}

const deleteUsers = async(req = request, res = response) => {

    const { id } = req.params;

    // physically
    //const user = User.findByIdAndDelete(id);

    // logically
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json({
        deleted: true,
        user
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}