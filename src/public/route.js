import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    // home page
    router.get('/', homeController.getHomePage);

    // CRUD NODEJS
    router.get('/create-user', homeController.createUser);
    router.post('/post-user', homeController.postUser);
    router.get('/get-user', homeController.getUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-user', homeController.putUser);
    router.get('/delete-user', homeController.deleteUser);

    // API 
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    return app.use("/", router);
}

module.exports = initWebRoutes;