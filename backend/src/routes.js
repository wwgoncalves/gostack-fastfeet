import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import AssignmentController from './app/controllers/AssignmentController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemByDeliveryController from './app/controllers/ProblemByDeliveryController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id/deliveries', AssignmentController.index);
routes.get(
  '/deliverymen/:id/deliveries/:delivery_id',
  AssignmentController.show
);
routes.put(
  '/deliverymen/:id/deliveries/:delivery_id',
  AssignmentController.update
);

routes.get('/deliveries/:id/problems', ProblemByDeliveryController.index);
routes.post('/deliveries/:id/problems', ProblemByDeliveryController.store);

// This file uploading route DOES NOT REQUIRE authentication
routes.post(
  '/deliverymen/:id/files',
  upload.single('file'),
  FileController.store
);

/* ******************************************************************************** */

// Authentication middleware for the following routes
routes.use(authMiddleware);

// This file uploading route DOES REQUIRES authentication
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.show);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/problems', DeliveryProblemController.index);
routes.get('/problems/:id', DeliveryProblemController.show);
routes.delete('/problems/:id/delivery', DeliveryProblemController.delete);

export default routes;
