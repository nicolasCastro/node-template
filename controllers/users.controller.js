const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = (req = request, res = response) => {

    const {
        name = 'No name',
        last_name = 'No last name',
        id = 0
    } = req.query;

    res.status(200).json({
        msg: 'get api - controller',
        name,
        last_name,
        id
    })
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

const putUsers = (req = request, res = response) => {

    // get param from the url /users/:id
    const { id } = req.params;

    res.status(200).json({
        msg: 'put api - controller',
        id
    })
}

const patchUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: 'patch api - controller'
    })
}

const deleteUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: 'delete api - controller'
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}