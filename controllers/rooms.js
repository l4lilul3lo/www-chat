const { getRoomsDB, getCafeInfoDB } = require("../models/room");

const addRoom = async (req, res) => {
  const { roomName, password } = req.body;
  await addRoomDB(roomName, password);
};

const getRooms = async (req, res) => {
  const rooms = await getRoomsDB();

  res.json({ rooms });
};

const getCafeInfo = async (req, res) => {
  const cafeInfo = await getCafeInfoDB();

  res.json({ cafeInfo });
};

module.exports = { getRooms, getCafeInfo };
