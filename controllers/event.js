import EventData from '../models/Event.js';


export const getAll = async (req, res) => {
  const events = await EventData.find();

  return res.status(200).json(events);
}

export const getOne = async (req, res) => {
  const event = await EventData.find({_id: req.params.id});

  return res.status(200).json(event);
}

export const create = async (req, res) => {
  const event = await EventData.create({...req.body});

  return res.status(200).json(event);
}

export const update = async (req, res) => {
  const event = await EventData.updateOne({_id: req.params.id}, {...req.body});
  
  return res.status(200).json(event);
}

export const remove = async (req, res) => {
  const event = await EventData.deleteOne({_id: req.params.id});
  
  return res.status(200).json(event);
}