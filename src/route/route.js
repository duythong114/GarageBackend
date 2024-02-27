import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/create-user', homeController.createUser);
    router.post('/post-user', homeController.postUser);
    router.get('/get-user', homeController.getUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-user', homeController.putUser);
    router.get('/delete-user', homeController.deleteUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;