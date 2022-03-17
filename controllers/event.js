import EventData from '../models/Event.js';


export const getAll = async (req, res) => {
  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);

  //TODO: 
  // events from today
  const events = await EventData.find({
    "date": { $gte: yesterday }
  }).populate("room").sort({"date": 1});

  // events until yesterday
  const expiredEvents = await EventData.find({
    "date": { $lt: yesterday }
  }).populate("room").sort({"date": 1});

  return res.status(200).json([...events, ...expiredEvents]);
}

export const getByType = async (req, res) => {
  const type = req.params.type;

  const date = new Date();
  const yesterday = date.setDate(date.getDate() - 1);

  const events = await EventData.find({
    "date": { $gte: yesterday },
    "type": type
  }).populate("room").sort({"date": 1});

  const expiredEvents = await EventData.find({
    "date": { $lt: yesterday },
    "type": type
  }).populate("room").sort({"date": 1});

  return res.status(200).json([...events, ...expiredEvents]);
}

export const getOne = async (req, res) => {
  const event = await EventData.findOne({_id: req.params.id})
  .populate("room")
  .populate("bookings");

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
  const event = await EventData.findOneAndDelete({_id: req.params.id});
  
  return res.status(200).json(event);
}