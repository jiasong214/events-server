import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserData from './User.js';
import RoomData from './Room.js';
import EventData from './Event.js';
import BookingData from './Booking.js';

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
    await createBookings();

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
      email: 'test@test.com',
      password: bcrypt.hashSync('chicken', 10),
    },
    {
      email: 'test1@test.com',
      password: bcrypt.hashSync('chicken', 10),
    },
    {
      email: 'test2test.com',
      password: bcrypt.hashSync('chicken', 10),
    },
    {
      email: 'test3@test.com',
      password: bcrypt.hashSync('chicken', 10),
    },
    {
      email: 'jiasong214@gmail.com',
      password: bcrypt.hashSync('chicken', 10),
    },
  ]);

  let admin = await UserData.create([
    {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('chicken', 10),
      type: "admin"
    }
  ])

  console.log(`USER: created ${users.length} users.`)
};

const createRooms = async () => {
  await RoomData.deleteMany();

  const rooms = await RoomData.create([
    {
      name: "Event hall 1",
      rows: 8,
      cols: 15,
    },
    {
      name: "Event hall 2",
      rows: 10,
      cols: 15,
    },
    {
      name: "Event hall 3",
      rows: 10,
      cols: 20,
    },
    {
      name: "Event hall 4",
      rows: 15,
      cols: 20,
    }
  ]);

  console.log(`ROOM: created ${rooms.length} rooms.`);
}

const setDate = (dayAfter, hour, min) => {
  const today = new Date();
  const anotherDay = new Date(today);

  anotherDay.setDate(today.getDate() + dayAfter);
  anotherDay.setHours(hour, min);
  
  return anotherDay;
}


const createEvents = async () => {
  await EventData.deleteMany();

  const rooms = await RoomData.find({})

  let events = await EventData.create([
    {
      type: "musical",
      name: "Moulin Rouge! The Musical",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647495430/events/oynmtqrd5i7pty4pshel.jpg",
      price: 69.5,
      date: setDate(3, 16, 0),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "The Lion King",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647497552/events/mo2zfeylofkkv8vs0rgy.jpg",
      price: 125,
      date: setDate(3, 18, 0),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "Chicago",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647497093/events/zuos4xqfz8ilze2kxsfk.jpg",
      price: 69.5,
      date: setDate(4, 20, 0),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "Cats",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647498010/events/hhghie1ikrszkwxtplym.jpg",
      price: 69.5,
      date: setDate(2, 19, 30),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "Wicked",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647497869/events/h50gqlnncq8hdc96mlls.jpg",
      price: 69.5,
      date: setDate(5, 16, 30),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "Sing Street",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647496796/events/d1i5rj5i62settz7agkg.jpg",
      price: 69.5,
      date: setDate(5, 18, 30),
      room: rooms[0]._id,
    },
    {
      type: "musical",
      name: "Harry Potter and the Cursed Child",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647496637/events/ayw408sjnbclja5fpovh.jpg",
      price: 99.5,
      date: setDate(3, 17, 30),
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "CHALKFACE",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647495006/events/bs9cjab2uu2cjqbygtzf.jpg",
      price: 93,
      date: setDate(5, 20, 30),
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "RBG: OF MANY, ONE",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647495070/events/ouivtxebktajmgfgkqel.jpg",
      price: 93,
      date: setDate(0, 17, 0),
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "CITY OF GOLD",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647496101/events/rh0n7xzhxd9ooyhmvyyk.jpg",
      price: 89,
      date: setDate(2, 18, 30),
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "THE TENANT OF WILDFELL HALL",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647494594/events/kjkqylantal69o4ryf7g.jpg",
      price: 93,
      date: setDate(4, 17, 0),
      room: rooms[0]._id,
    },
    {
      type: "drama",
      name: "A RAISIN IN THE SUN",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647494765/events/vtjj34laanesfraushtx.jpg",
      price: 93,
      date: setDate(6, 18, 30),
      room: rooms[0]._id,
    },
    {
      type: "comedy",
      name: "BLITHE SPIRIT",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647442130/events/mpwtsnkgflorwqp8dtqf.jpg",
      price: 104,
      date: setDate(2, 16, 0),
      room: rooms[0]._id,
    },
    {
      type: "comedy",
      name: "THE LIFESPAN OF A FACT",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647442193/events/ns4acagg0xb0dcn9mcuw.jpg",
      price: 93,
      date: setDate(0, 18, 30),
      room: rooms[0]._id,
    },
    {
      type: "comedy",
      name: "TOP COAT",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647494443/events/zq86o3wsoblxe6vspqaw.jpg",
      price: 66,
      date: setDate(1, 16, 30),
      room: rooms[0]._id,
    },
    {
      type: "concert",
      name: "The Psychedelic Cello",
      image: "https://res.cloudinary.com/dwhhlicmv/image/upload/v1647498124/events/efr98bjf4qiuqdu8oxag.jpg",
      price: 69.5,
      date: setDate(4, 18, 30),
      room: rooms[0]._id,
    },
  ])

  console.log(`EVENT: created ${events.length} events.`);
}

const createBooking = async (userID, eventID, seats, paymentID) => {
  // 1. create a booking
  const newBooking = await BookingData.create({
    user: userID,
    event: eventID,
    seats,
    paymentID
  });

  // 2. push the booking in User data
  const user = await UserData.findOne({_id: userID});
  user.bookings.push(newBooking._id);
  await user.save();

  // // 3. push the booking in Event data
  const event = await EventData.findOne({_id: eventID});
  event.bookings.push(newBooking._id);
  await event.save();
}

const createBookings = async () => {
  await BookingData.deleteMany();

  const users = await UserData.find();
  const events = await EventData.find();

  for(let i=0; i<events.length; i++) {
    const booking1 = await createBooking(
      users[1]._id.toString(), 
      events[i]._id.toString(), 
      ["0-0", "0-1", "0-2", "0-3", "2-3", "2-4", "2-5", "2-6", "4-6", "4-7", "4-8"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );
    
    const booking2 = await  createBooking(
      users[2]._id.toString(), 
      events[i]._id.toString(), 
      ["1-3", "1-4", "1-5", "1-6"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );

    const booking3 = await createBooking(
      users[3]._id.toString(), 
      events[i]._id.toString(), 
      ["6-5", "6-6"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );

    const booking4 = await createBooking(
      users[3]._id.toString(), 
      events[i]._id.toString(), 
      ["3-7", "3-8", "3-9"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );

    const booking5 = await createBooking(
      users[1]._id.toString(), 
      events[i]._id.toString(), 
      ["5-9", "5-10"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );

    const booking6 = await createBooking(
      users[2]._id.toString(), 
      events[i]._id.toString(), 
      ["5-6", "5-7", "5-8"],
      "cs_test_a1xhjgm5XLiryQir0Crpla2l5VG5fEJBdhlaDpHjBWwXfL2kfyR4lYKeC7"
    );
  }

  const bookings = await BookingData.find();

  console.log(`BOOKING: create ${bookings.length} bookings.`)
}