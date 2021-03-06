import express from 'express';
import * as eventController from '../controllers/event.js';

const eventRouter = express.Router();

eventRouter.route('/')
  .get(eventController.getAll)
  .post(eventController.create);

eventRouter.route('/:id')
  .get(eventController.getOne)
  .put(eventController.update)
  .delete(eventController.remove);

eventRouter.get('/type/:type', eventController.getByType);
eventRouter.get('/search/:term', eventController.getBySearch);

export default eventRouter;