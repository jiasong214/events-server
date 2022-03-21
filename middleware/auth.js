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

  // 2. if there is no token, early return
  if(!token) return res.status(401).json({ message: 'Authentication error' });

  // 3. if there is a token, verify it
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {

    // 3-1. check error and early return
    if(err) return res.status(401).json({ message: 'Authentication error' });

    // 3-2, check if user is actually exist
    const user = await UserData.findOne({_id: decoded._id});

    if(!user) return res.status(401).json({ message: 'Authentication error' });

    // 3-3. if the token is verified, go to the controller
    req.userID = user._id; // for me()
    next();
  });
}