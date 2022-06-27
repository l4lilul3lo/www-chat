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

async function fetchUsers(roomId) {
  const { users } = await post("users/getUsers", {
    name: "roomId",
    data: roomId,
  });

  return users;
}

async function fetchCafeInfo() {
  const { cafeInfo } = await get("rooms/getCafeInfo");

  return cafeInfo;
}

async function fetchUser() {
  const { user } = await get("users/getUser");

  return user;
}

module.exports = {
  fetchMessages,
  fetchRooms,
  fetchUsers,
  fetchCafeInfo,
  fetchUser,
};