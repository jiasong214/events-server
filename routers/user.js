import express from 'express';
import * as userController from '../controllers/user.js';
import { isAuth } from '../middleware/auth.js';

const userRouter = express.Router();

// userRouter.get('/', userController.getAll);
userRouter.get('/me', isAuth, userController.me);
userRouter.get('/:id', userController.getOne);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

userRouter.post('/:id/wishlist', isAuth, userController.addWishlist);
userRouter.delete('/:id/wishlist/:eventID', isAuth, userController.removeWishlist);


export default userRouter;