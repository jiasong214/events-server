import jwt from 'jsonwebtoken';
import UserData from '../models/User.js';
import {config} from '../config.js';

export const isAuth = async (req, res, next) => {
  // 1. get a token from the request header
  let token;

  const header = req.get('Authorization');

  if(header && header.startsWith('Bearer ')) {
    token = header.split(' ')[1];
  }

  // if there is no token, early return
  if(!token) return res.status(401).json({ message: 'Authentication error' });

  // 2. verify the token
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {

    // check error and early return
    if(err) return res.status(401).json({ message: 'Authentication error' });

    // 3. check if user is actually exist with the decoded preload
    const user = await UserData.findOne({_id: decoded._id});

    if(!user) return res.status(401).json({ message: 'Authentication error' });

    // store the user id in req.userID (for me() function)
    req.userID = user._id;

    // 4. if the token is verified, go to the next function in the controller
    next();
  });
}