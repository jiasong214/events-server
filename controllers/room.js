import RoomData from '../models/Room.js';

export const getAll = async (req, res) => {
  const events = await RoomData.find();

  return res.status(200).json(events);
}

export const getOne = async (req, res) => {
  const event = await RoomData.findOne({_id: req.params.id});

  return res.status(200).json(event);
}

export const create = async (req, res) => {
  const event = await RoomData.create({...req.body});

  return res.status(200).json(event);
}

export const update = async (req, res) => {
  const event = await RoomData.updateOne({_id: req.params.id}, {...req.body});
  
  return res.status(200).json(event);
}

export const remove = async (req, res) => {
  const event = await RoomData.findOneAndDelete({_id: req.params.id});
  
  return res.status(200).json(event);
}