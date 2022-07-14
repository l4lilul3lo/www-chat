// post request

async function fetcher(endpoint, options = {}) {
  const baseUrl = "http://localhost:9000/";
  const url = baseUrl + endpoint;
  const response = await fetch(url, { ...options, credentials: "include" });
  const data = await response.json();
  return data;
  if (options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

async function post(endpoint, content) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ [content.name]: content.data }),
  };
  const data = await fetcher(endpoint, options);
  return data;
}

async function get(endpoint) {
  const data = await fetcher(endpoint, {
    credentials: "include",
  });
  return data;
}

async function checkAuth() {
  try {
    const data = await get("users/checkAuth");
    return data;
  } catch (error) {
    console.log(error);
  }
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

async function login(formData) {
  const { message } = await post("users/login", {
    name: "formData",
    data: formData,
  });
  return message;
}

async function register(formData) {
  const { message } = await post("users/register", {
    name: "formData",
    data: formData,
  });
  return message;
}

async function updateUserImage(url) {}

export {
  fetchMessages,
  fetchRooms,
  fetchCafeInfo,
  fetchUser,
  fetchIsBlocked,
  checkAuth,
  login,
  register,
};
