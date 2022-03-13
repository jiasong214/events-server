import express from 'express';
import * as eventController from '../controllers/event.js';

const eventRouter = express.Router();

eventRouter.get('/', eventController.getAll);
eventRouter.get('/:id', eventController.getOne);
eventRouter.post('/', eventController.create);
eventRouter.put('/:id', eventController.update);
eventRouter.delete('/:id', eventController.remove);

export default eventRouter;