import express from 'express';
import * as eventController from '../controllers/event.js';

const eventRouter = express.Router();

eventRouter.route('/')
  .get(eventController.getAll)
  .post(eventController.create);

eventRouter.get('/type/:type', eventController.getByType);

eventRouter.route('/:id')
  .get(eventController.getOne)
  .post(eventController.create)
  .put(eventController.update)
  .delete(eventController.remove);

export default eventRouter;