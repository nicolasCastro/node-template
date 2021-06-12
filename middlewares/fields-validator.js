const { request, response } = require("express");
const { validationResult } = require("express-validator");
const Role = require("../models/role");
const User = require("../models/user");


const checkFields = (req = request, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({
        errors
    })
    next();
}

const checkRole = async (role = '') => {
    const isValid = await Role.findOne({ role });
    if (!isValid) throw new Error(`${role} doesn't exists`);
}

const checkEmailDb = async (email = '') => {
    // check the email
    const exist = await User.findOne({ email });
    if (exist) throw new Error('Email already in use');
}

module.exports = {
    checkFields,
    checkRole,
    checkEmailDb
}