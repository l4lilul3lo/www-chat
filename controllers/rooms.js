const { getRoomsDB } = require("../models/rooms/rooms");

const getRooms = async (req, res) => {
  const rooms = await getRoomsDB();

  res.json({ rooms });
};

module.exports = { getRooms };
