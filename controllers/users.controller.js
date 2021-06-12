const { request, response } = require('express');


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

const postUsers = (req = request, res = response) => {

    // params from the raw json body
    const { name, last_name } = req.body;

    res.status(200).json({
        msg: 'post api - controller',
        name,
        last_name
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