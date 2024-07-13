const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    return res.json('all users');
}

async function handleGetUserById(req, res) {
    return res.json('User by id found');

}

async function handleCreateNewUser(req, res) {
    return res.json('user created');

}

async function handleUpdateUserById(req, res) {
    return res.json('User has been updated');
}

async function handleDeleteUserById(req, res) {
    return res.json('User has been deleted');
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateNewUser,
    handleUpdateUserById,
    handleDeleteUserById,

};