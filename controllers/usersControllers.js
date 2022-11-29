//Esquema de nuestra BD mongo
const User = require('../models/Users')
const Note = require('../models/Note')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req, res) => {

})

const createNewUser = asyncHandler(async (req, res) => {

})


const updateUser = asyncHandler(async (req, res) => {

})


const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}