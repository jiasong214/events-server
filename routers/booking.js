import express from 'express';
import * as bookingController from '../controllers/booking.js';

const bookingRouter = express.Router();

bookingRouter.get('/', bookingController.getAll);
bookingRouter.get('/:id', bookingController.getOne);
bookingRouter.post('/', bookingController.create);
// bookingRouter.put('/:id', bookingController.update);
// bookingRouter.delete('/:id', bookingController.remove);

export default bookingRouter;