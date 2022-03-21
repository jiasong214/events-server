import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserData from '../models/User.js';
import user from '../models/User.js';

const createJWT = (id) => {
  return jwt.sign(
    {_id: id},
    "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z",
    { expiresIn: 86400 },
  )
}

export const signup = async (req, res) => {
  const { email, password } = req.body;

  // 1. check if email is taken
  const isTaken = await UserData.findOne({email});
  if(isTaken) {
    return res.status(401).json({message: 'The email is already taken'});
  }

  // 2. encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // 3. create a user in DB
  const newUser = await UserData.create({email, password: encryptedPassword});
  if(!newUser) {
    return res.status(404).json({message: 'Fail to create a user'});
  }

  // 4. create a token
  const token = createJWT(newUser.id);

  // 5. send a response
  return res.status(200).json({
    _id: newUser.id, 
    token,
    type: newUser.type
  });
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. check if user email is exist
  const user = await UserData.findOne({email});

  if(!user) {
    return res.status(401).json({message: 'Invalid username or password'});
  }

  // 2. check if password is matched
  const isMatched = await bcrypt.compare(password, user.password);
  if(!isMatched) {
    return res.status(401).json({message: 'Invalid username or password'});
  }

  // 3. create a token
  const token = createJWT(user._id);

  // 4. send a response
  return res.status(200).json({
    _id: user.id, 
    token,
    type: user.type
  });
}

export const me = async (req, res) => {
  const userID = req.userID;
  const user = await UserData.findOne({_id: userID});

  return res.status(200).json(user);
}

export const getAll = async (req, res) => {
  const users = await UserData.find();

  return res.status(200).json(users);
}

export const getOne = async (req, res) => {
  const id = req.params.id;
  const user = await UserData.findOne({_id: id})
    .populate("wishlist")
    .populate("bookings");
 
  return res.status(200).json(user);
}

export const addWishlist = async (req, res) => {
  const userID = req.params.id;
  const eventID = req.body.eventID;

  const user = await UserData.findOne({_id: userID});

  user.wishlist.push(eventID);
  await user.save();

  return res.status(200).json(user);
}

export const removeWishlist = async (req, res) => {
  const userID = req.params.id;
  const eventID = req.params.eventID;

  // 1. find user's wishlist
  const user = await UserData.findOne({_id: userID});
  const wishlist = await user.wishlist;

  // 2. remove the target item in the wishlist
  const filteredWishlist = wishlist.filter((item) => item.toString() !== eventID);
  user.wishlist = filteredWishlist;

  // 3. save the result and populate it
  const newUser = await user.save()
    .then(data => data.populate("wishlist"));

  return res.status(200).json(newUser);
}

// export const remove = async (req, res) => {
//   const { email, password } = req.body;

// }