import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
    }
}

let createUser = (req, res) => {
    return res.render('createUser.ejs')
}

let postUser = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('Post User successfully')
}

let getUser = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayUser.ejs', {
        dataTable: data
    })
}

let editUser = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('editUser.ejs', {
            user: userData
        })
    }
    else {
        return res.send('User not found')
    }
}

let putUser = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)

    return res.render('displayUser.ejs', {
        dataTable: allUsers
    })
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('Delete the user successfully')
    }
    else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    createUser: createUser,
    postUser: postUser,
    getUser: getUser,
    editUser: editUser,
    putUser: putUser,
    deleteUser: deleteUser,
}