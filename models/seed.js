import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserData from './User.js';
import RoomData from './Room.js';
import EventData from './Event.js';

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/events-website');
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection error', err);
});

db.once('open', async () => {
  console.log('Connected.');

  try {
    await createRooms();
    await createEvents();
    await createUsers();

  }catch(err) {
    db.close();
    process.exit(1);
  }

  process.exit(0);
});

const createUsers = async () => {
  await UserData.deleteMany();

  let users = await UserData.create([
    {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('chicken', 10),
      type: "admin"
    },
    {
      email: 'jiasong214@gmail.com',
      password: bcrypt.hashSync('chicken', 10),
    },
  ]);

  console.log(`USER: created ${users.length} users.`)



  // await user[1].wishlist.push()

  // await testFlights[0].saveReservation( 10, 1, users[0] );
  // await testFlights[1].saveReservation( 10, 2, users[1] );
  // await testFlights[1].saveReservation( 10, 2, users[1] );
};

const createRooms = async () => {
  await RoomData.deleteMany();

  const rooms = await RoomData.create([
    {
      name: "Event hall 1",
      rows: 10,
      cols: 15,
    },
    {
      name: "Event hall 2",
      rows: 15,
      cols: 20,
    },
    {
      name: "Event hall 3",
      rows: 20,
      cols: 20,
    },
    {
      name: "Event hall 4",
      rows: 10,
      cols: 20,
    }
  ]);

  console.log(`ROOM: created ${rooms.length} rooms.`);
}

const createEvents = async () => {
  await EventData.deleteMany();

  const rooms = await RoomData.find({});

  let events = await EventData.create([
    {
      type: "musical",
      name: "Aladdin",
      image: "",
      price: 69.5,
      date: "2022-03-20T08:29:00.000Z",
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "The Lion King",
      image: "",
      price: 125,
      date: "2022-03-21T08:29:00.000Z",
      room: rooms[1]._id,
    },
    {
      type: "musical",
      name: "Sing Street",
      image: "",
      price: 69.5,
      date: "2022-03-21T12:29:00.000Z",
      room: rooms[2]._id,
    },
    {
      type: "musical",
      name: "Harry Potter and the Cursed Child",
      image: "",
      price: 99.5,
      date: "2022-03-14T12:29:00.000Z",
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "To Kill a Mockingbird",
      image: "",
      price: 69.5,
      date: "2022-03-19T12:29:00.000Z",
      room: rooms[3]._id,
    },
    {
      type: "drama",
      name: "CITY OF GOLD",
      image: "",
      price: 89,
      date: "2022-03-19T12:29:00.000Z",
      room: rooms[3]._id,
    },
    {
      type: "comedy",
      name: "BLITHE SPIRIT",
      image: "",
      price: 104,
      date: "2022-03-19T12:29:00.000Z",
      room: rooms[3]._id,
    },
    {
      type: "comedy",
      name: "THE LIFESPAN OF A FACT",
      image: "",
      price: 93,
      date: "2022-03-19T12:29:00.000Z",
      room: rooms[3]._id,
    },
    {
      type: "concert",
      name: "The Psychedelic Cello",
      image: "",
      price: 69.5,
      date: "2022-03-22T12:29:00.000Z",
      room: rooms[0]._id,
    },
  ])

  console.log(`EVENT: created ${events.length} events.`);
}