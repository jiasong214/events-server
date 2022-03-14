import express from 'express';
import * as userController from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);

userRouter.post('/:id/wishlist', userController.addWishlist);
userRouter.delete('/:id/wishlist/:eventID', userController.removeWishlist);


export default userRouter;