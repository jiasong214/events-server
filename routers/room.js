import express from 'express';
import * as roomController from '../controllers/room.js';

const roomRouter = express.Router();

roomRouter.route('/')
  .get(roomController.getAll)
  .post(roomController.create);

roomRouter.route('/:id')
  .get(roomController.getOne)
  .post(roomController.create)
  .put(roomController.update)
  .delete(roomController.remove);

export default roomRouter;