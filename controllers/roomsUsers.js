const { getRoomUserInfoDB } = require("../models/roomsUsers");

const getIsBlocked = async (req, res) => {
  const userId = req.session.userId;
  const { roomId } = req.body;
  const response = await getRoomUserInfoDB(userId, roomId);
  const isBlocked = response.isBlocked;

  res.json({ isBlocked });
};

module.exports = { getIsBlocked };
