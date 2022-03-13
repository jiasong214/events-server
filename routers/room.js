import express from 'express';
import * as roomController from '../controllers/room.js';

const roomRouter = express.Router();

roomRouter.get('/', roomController.getAll);
roomRouter.get('/:id', roomController.getOne);
roomRouter.post('/', roomController.create);
roomRouter.put('/:id', roomController.update);
roomRouter.delete('/:id', roomController.remove);

export default roomRouter;