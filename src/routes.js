const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const upload = multer(multerConfig);
const routes = new Router();
require('express-group-routes');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PlanController = require('./app/controllers/internetPlansController');
const LeadsController = require('./app/controllers/LeadsController');

const authMiddleware = require('./app/middlewares/auth');


routes.post('/session', SessionController.store);
routes.post('/admin', UserController.store);

routes.use('/api/v1', authMiddleware);

routes.group('/api/v1/users', (route) => {
    route.post('/create', UserController.store);
    route.get('/list', UserController.list);
    route.get('/list/one/:id', UserController.get);
    route.put('/edit', authMiddleware, UserController.update);
    route.delete('/delete/:id', authMiddleware, UserController.delete);
})

routes.group('/api/v1/plans', (route) => {
    route.post('/create', PlanController.store);
    route.get('/list', PlanController.list);
    route.get('/list/one/:id', PlanController.get);
    route.put('/edit', PlanController.update);
    route.delete('/delete/:id', PlanController.delete);
});

routes.group('/api/v1/leads', (route) => {
    route.post('/create', LeadsController.store);
    route.get('/list', LeadsController.list);
    route.get('/list/one/:id', LeadsController.get);
    route.put('/edit', LeadsController.update);
    route.put('/delete/:id', LeadsController.delete);
    route.post('/client-picture/:id', upload.single('file'), LeadsController.clientPicture);
});

module.exports = routes;