// post request
async function post(url, content) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [content.name]: content.data }),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function get(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchIsBlocked(roomId) {
  try {
    const { isBlocked } = await post("roomsUsers/getIsBlocked", {
      name: "roomId",
      data: roomId,
    });
    return isBlocked;
  } catch (err) {
    console.log(err);
  }
}

async function fetchRooms() {
  const { rooms } = await get("rooms/getRooms");

  return rooms;
}

async function fetchMessages(roomId) {
  const { messages } = await post("messages/getMessages", {
    name: "roomId",
    data: roomId,
  });

  return messages;
}

async function fetchCafeInfo() {
  const { cafeInfo } = await get("rooms/getCafeInfo");

  return cafeInfo;
}

async function fetchUser() {
  const { user } = await get("users/getUser");

  return user;
}

async function updateUserImage(url) {}

module.exports = {
  fetchMessages,
  fetchRooms,
  fetchCafeInfo,
  fetchUser,
  fetchIsBlocked,
};
