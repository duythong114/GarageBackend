import db from '../models/index';
import bcrypt from "bcryptjs";


const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isEmailExist = await checkUserEmail(email)
            if (isEmailExist) {
                // user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'firstName', 'lastName', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                })
                if (user) {
                    // compare password 
                    let checkPassword = bcrypt.compareSync(password, user.password); // false
                    if (checkPassword) {
                        userData.errorCode = 0
                        userData.errorMessage = 'Password is true'
                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errorCode = 3
                        userData.errorMessage = 'Password is false'
                    }
                } else {
                    userData.errorCode = 2
                    userData.errorMessage = 'User not found'
                }
            } else {
                // return error
                userData.errorCode = 1
                userData.errorMessage = 'your email is not exist, please try other'
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)

        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist?
            let isEmailExist = await checkUserEmail(data.email)
            if (isEmailExist === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Your email is already in used, Pls try another email"
                })
            } else {
                // hash password
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                // create a new user
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === 1 ? true : false,
                    roleId: data.roleId,
                })

                resolve({
                    errorCode: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'User not found'
                })
            }

            await db.User.destroy({
                where: { id: userId }
            })

            resolve({
                errorCode: 0,
                message: "User is deleted"
            })
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserdata = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errorMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()

                resolve({
                    errorCode: 0,
                    message: 'Update user successfully'
                })
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: 'User not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    hashUserPassword: hashUserPassword,
    loginUser: loginUser,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserdata: updateUserdata,
}