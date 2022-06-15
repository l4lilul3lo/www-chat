const { getRoomsDB, getCafeIdDB } = require("../models/rooms/rooms");

const getRooms = async (req, res) => {
  const rooms = await getRoomsDB();

  res.json({ rooms });
};

const getCafeId = async (req, res) => {
  const cafeId = await getCafeIdDB();
  res.json({ cafeId });
};

module.exports = { getRooms, getCafeId };
